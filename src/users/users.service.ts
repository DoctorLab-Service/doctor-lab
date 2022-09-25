import { EDefaultRoles, ESystemsRoles } from 'src/roles/roles.enums'
import { FileUpload } from 'graphql-upload'
import { relationsConfig } from 'src/common/configs/relations.config'
import { User } from 'src/users/entities'
import { Inject, Injectable, Optional } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TokenService } from 'src/token/token.service'
import { Repository } from 'typeorm'
import { CONTEXT } from '@nestjs/graphql'
import { ValidationException } from 'src/exceptions'
import { LanguageService } from 'src/language/language.service'
import { MyAccountOutput } from './dtos/my-account.dto'
import { FilesService } from 'src/files/files.services'
import { object } from 'src/common/helpers'
import { RolesService } from 'src/roles/roles.service'
import { systemUserParams } from './config/users.config'
import { VerificationsService } from 'src/verifications/verifications.service'
import {
    CreateAccountInput,
    CreateAccountOutput,
    UpdateAccountInput,
    UpdateAccountOutput,
    DeleteAccountOutput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
    FindByEmailInput,
    FindAllUsersOutput,
    ChangeEmailInput,
    ChangeOutput,
    ChangePasswordInput,
    ChangePhoneInput,
} from './dtos'
import { EResetKey } from './config/users.enum'
import { EmailService } from 'src/email/email.service'

@Injectable()
export class UsersService {
    constructor(
        @Inject(CONTEXT) private readonly context,
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly verificationService: VerificationsService,
        private readonly emailService: EmailService,
        private readonly token: TokenService,
        private readonly files: FilesService,
        private readonly roleService: RolesService,
        private readonly languageService: LanguageService,
    ) {}

    /**
     * Set default super_admin role with all permissions
     * @Returns {Promise<boolean>}
     */
    async _createSystemUser(): Promise<boolean> {
        try {
            // Check system user
            const user = await this.users.findOne({ where: { email: systemUserParams.email } })
            console.log(user)
            if (!user) {
                // Create System user
                const systemUser = await this.users.save(this.users.create(systemUserParams))
                if (!systemUser) {
                    throw new Error()
                }
                // Add system role for created user
                await this.roleService.setUserRole(
                    {
                        role: ESystemsRoles.super_admin,
                        userId: systemUser.id,
                    },
                    true,
                )
                await this.roleService.setUserRole(
                    {
                        role: EDefaultRoles.admin,
                        userId: systemUser.id,
                    },
                    true,
                )
            }

            return true
        } catch (error) {
            console.log(error)
            throw new Error(await this.languageService.setError(['isNot', 'createSystemUser'], 'users'))
        }
    }

    /**
     * Create a new user
     * @param body users object data from auth form
     */
    async createAccount(body: CreateAccountInput): Promise<CreateAccountOutput> {
        // Check by exist to email and check verifyPhone if true  to return error
        const existEmail = await this.users.findOne({ where: { email: body.email } })
        if (existEmail && existEmail.verifiedPhone) {
            throw new ValidationException({
                email: await this.languageService.setError(['isExists', 'email']),
            })
        }

        // Check by exist to phone and check verifyPhone if true  to return error
        const existPhone = await this.users.findOne({ where: { phone: body.phone } })
        if (existPhone && existPhone.verifiedPhone) {
            throw new ValidationException({
                phone: await this.languageService.setError(['isExists', 'phone']),
            })
        }

        // If user exist by email or phone  and phone is not verify
        // Delete this user
        if (existEmail && !existEmail.verifiedPhone) {
            await this.users.delete(existEmail.id)
        }
        if (existPhone && !existPhone.verifiedPhone) {
            await this.users.delete(existPhone.id)
        }

        // Create user if email and phone is not exist
        const user = await this.users.save(this.users.create({ ...body }))
        if (!user) {
            throw new ValidationException({
                create: await this.languageService.setError(['isNot', 'createUser']),
            })
        }
        // Set role for user
        await this.roleService.setUserRole(
            {
                role: body.role,
                userId: user.id,
            },
            true,
        )

        // Create and send verification code
        await this.verificationService.verificationEmailCode(user)
        // * SEND SMS
        await this.verificationService.verificationPhoneCode(user)

        try {
            // Create accessToken and refreshToken
            const tokens = await this.token.generateTokens({ id: user.id })
            this.token.saveTokens(user.id, tokens)

            return { ok: Boolean(user), ...tokens, user }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                create: await this.languageService.setError(['token', 'notCreated']),
            })
        }
    }

    /**
     * Update a user
     * @param body users object data from update  form
     * @param file { file: FileUpload } file object
     */
    async updateAccount(body: UpdateAccountInput, file: FileUpload | null): Promise<UpdateAccountOutput> {
        // Find user in DB
        const currentUser: User = await this.token.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        if (!user) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNotFound', 'user']),
            })
        }

        // If file exist to upload on cloudinary
        if (file) {
            const avatar = await this.files.uploadFiles(file, {
                userId: currentUser.id,
                key: 'avatar',
            })

            if (!avatar.paths.length) {
                throw new ValidationException({
                    upload_file: await this.languageService.setError(['isNot', 'upload'], 'files'),
                })
            }
            // Upload avatar to database
            user.avatar = avatar.paths[0].toString() || user.avatar
        }

        // Update account data in database
        if (!object.isEmpty(body)) {
            user.fullname = body.fullname || user.fullname
            user.country = body.country || user.country
            user.state = body.state || user.state
            user.address = body.address || user.address
            user.experience = body.experience || user.experience
            user.language = body.language || user.language
            user.birthdate = body.birthdate || user.birthdate
        }

        // Update user data and return
        try {
            const updatedUser = await this.users.save({ ...object.withoutProperties(user, ['password']) })

            return { ok: Boolean(updatedUser), user: updatedUser }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                update: await this.languageService.setError(['isNot', 'updateUser']),
            })
        }
    }

    /**
     * Delete current user
     * @returns object, ok: true, false,
     */
    async deleteAccount(): Promise<DeleteAccountOutput> {
        try {
            const currentUser: User = await this.token.getContextUser(this.context)
            await this.files.deleteFiles(currentUser.id)
            const deletedUser = await this.users.delete(currentUser.id)
            return { ok: Boolean(deletedUser.affected > 0) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                delete: await this.languageService.setError(['isNot', 'deleteUser']),
            })
        }
    }

    /**
     * Get data current user
     */
    async myAccount(): Promise<MyAccountOutput> {
        const currentUser: User = await this.token.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        if (!user) {
            throw new ValidationException({
                not_found: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }
        return { ok: Boolean(user), user }
    }

    /**
     * Find User by Id
     */
    async findById({ id }: FindByIdInput): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { id }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                not_found: await this.languageService.setError(['isNot', 'foundUser']),
            })

        return { ok: Boolean(user), user }
    }

    /**
     * Find User by phone
     */
    async findByPhone({ phone }: FindByPhoneInput): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { phone }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                not_found: await this.languageService.setError(['isNotFound', 'user']),
            })

        return { ok: Boolean(user), user }
    }

    /**
     * Find User by email
     */
    async findByEmail({ email }: FindByEmailInput): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { email }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                not_found: await this.languageService.setError(['isNotFound', 'user']),
            })

        return { ok: Boolean(user), user }
    }

    /**
     * Find all users
     */
    async findAllUsers(): Promise<FindAllUsersOutput> {
        const users = await this.users.find({ ...relationsConfig.users })
        if (!users.length)
            throw new ValidationException({
                not_found: await this.languageService.setError(['isNotFound', 'user']),
            })

        return { ok: Boolean(users.length), users }
    }

    /**
     * Change Password current user
     * @param body password | rePasword
     */
    async changePassword(body: ChangePasswordInput): Promise<ChangeOutput> {
        const currentUser: User = await this.token.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id, resetKey: EResetKey.password } })
        if (!user) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        let updatedUser: User
        try {
            user.password = body.password
            user.resetKey = null
            updatedUser = await this.users.save(user)
        } catch (error) {
            throw new ValidationException({
                change: await this.languageService.setError(['isChange', 'email']),
            })
        }

        try {
            // Send Changed info
            await this.emailService.sendChangeInfo('password', {
                to: user.email,
                fullname: user.fullname,
                changedData: body.password,
            })
        } catch (error) {
            throw new ValidationException({
                no_send: await this.languageService.setError(['isNotVerify', 'noSendEmail'], 'verify'),
            })
        }

        // Remove token from database
        // If it exists
        await this.token.removeTokenByUserId(user.id)

        return { ok: Boolean(updatedUser) }
    }

    /**
     * Change email current user
     * @param body email | reEmail
     */
    async changeEmail(body: ChangeEmailInput): Promise<ChangeOutput> {
        const currentUser: User = await this.token.getContextUser(this.context)
        const user = await this.users.findOne({
            where: { id: currentUser.id, resetKey: EResetKey.email },
        })
        if (!user) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        let updatedUser: User
        try {
            user.email = body.email
            user.verifiedEmail = false
            user.resetKey = null

            updatedUser = await this.users.save({ ...object.withoutProperties(user, ['password']) })
        } catch (error) {
            throw new ValidationException({
                change: await this.languageService.setError(['isChange', 'email']),
            })
        }

        try {
            // Send Changed info
            await this.emailService.sendChangeInfo('email', {
                to: user.email,
                fullname: user.fullname,
                changedData: user.email,
            })
        } catch (error) {
            throw new ValidationException({
                no_send: await this.languageService.setError(['isNotVerify', 'noSendEmail'], 'verify'),
            })
        }

        return { ok: Boolean(updatedUser.email === body.email) }
    }

    /**
     * Change Phone current user
     * @param body phone
     */
    async changePhone(body: ChangePhoneInput): Promise<ChangeOutput> {
        const currentUser: User = await this.token.getContextUser(this.context)
        const user = await this.users.findOne({
            where: { id: currentUser.id, resetKey: EResetKey.phone },
        })
        if (!user) {
            throw new ValidationException({
                not_exist: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        // Check to verification email, if true to change email address
        if (!user.verifiedEmail) {
            throw new ValidationException({
                verify: await this.languageService.setError(['isNotVerify', 'email'], 'verify'),
            })
        }

        let updatedUser: User
        try {
            user.phone = body.phone
            user.verifiedPhone = false
            user.resetKey = null

            // Create new user object without password
            updatedUser = await this.users.save({ ...object.withoutProperties(user, ['password']) })
        } catch (error) {
            throw new ValidationException({
                change: await this.languageService.setError(['isChange', 'phone']),
            })
        }

        try {
            // * SEND SMS
            // Send verification code. Sms
            await this.verificationService.verificationPhoneCode(user)

            // Send Changed info
            await this.emailService.sendChangeInfo('phone', {
                to: user.email,
                fullname: user.fullname,
                changedData: user.phone,
            })
        } catch (error) {
            throw new ValidationException({
                no_send: await this.languageService.setError(['isNotVerify', 'noSendSMS'], 'verify'),
            })
        }

        return { ok: Boolean(updatedUser.phone === body.phone) }
    }
}
