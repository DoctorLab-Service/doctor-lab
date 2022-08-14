import { EDefaultRoles } from 'src/roles/roles.enums'
import { ESystemsRoles } from './../roles/roles.enums'
import { FileUpload } from 'graphql-upload'
import { relationsConfig } from 'src/common/configs/relations.config'
import { User } from 'src/users/entities/user.entity'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from 'src/jwt/jwt.service'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { DeleteAccountOutput } from './dtos/delete-account.dto'
import { FindAllUsersOutput, FindByEmailInput, FindByIdInput, FindByOutput, FindByPhoneInput } from './dtos/find.dto'
import { UpdateAccountInput, UpdateAccountOutput } from './dtos/update-account.dto'
import { Repository } from 'typeorm'
import { VerificationEmail } from 'src/verifications/entities/verification-email.entiry'
import { VerificationPhone } from 'src/verifications/entities/verification-phone.entiry'
import { EmailService } from 'src/email/email.service'
import { PhoneService } from 'src/phone/phone.service'
import { CONTEXT } from '@nestjs/graphql'
import { ForbiddenException, ValidationException } from 'src/exceptions'
import { LanguageService } from 'src/language/language.service'
import { MyAccountOutput } from './dtos/my-account.dto'
import { FilesService } from 'src/files/files.services'
import { object } from 'src/common/helpers'
import { RolesService } from 'src/roles/roles.service'
import { systemUserParams } from './users.config'

@Injectable()
export class UsersService {
    constructor(
        @Inject(CONTEXT) private readonly context,
        // @InjectRepository(UserRoles) private readonly userRoles: Repository<UserRoles>,
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerificationEmail) private readonly verificationEmail: Repository<VerificationEmail>,
        @InjectRepository(VerificationPhone) private readonly verificationPhone: Repository<VerificationPhone>,
        private readonly jwt: JwtService,
        private readonly files: FilesService,
        private readonly roleService: RolesService,
        private readonly emailService: EmailService,
        private readonly phoneService: PhoneService,
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
     * @returns object, ok: true, false,
     */
    async createAccount(body: CreateAccountInput): Promise<CreateAccountOutput> {
        // Check by exist to email
        const existEmail = await this.users.findOne({ where: { email: body.email } })
        if (existEmail)
            throw new ValidationException({
                email: await this.languageService.setError(['isExists', 'email']),
            })

        // Check by exist to phone
        const existPhone = await this.users.findOne({ where: { phone: body.phone } })
        if (existPhone)
            throw new ValidationException({
                email: await this.languageService.setError(['isExists', 'phone']),
            })

        // Create user if email and phone is not exist
        const user = await this.users.save(this.users.create({ ...body }))
        if (!user)
            throw new ValidationException({
                email: await this.languageService.setError(['isNot', 'createUser']),
            })

        // Create Code for email and phone
        const codeEmail = await this.verificationEmail.save(this.verificationEmail.create({ user }))
        const codePhone = await this.verificationPhone.save(this.verificationPhone.create({ user }))

        // Send verification on email and phone
        if (codeEmail) {
            await this.emailService.sendVerificationEmail(user.email, user.fullname, codeEmail.code)
        } else {
            throw new ValidationException({
                phone: await this.languageService.setError(['isNotVerify', 'noSendEmail']),
            })
        }

        // if (codePhone) {
        //     await this.phoneService.sendVerificationSMS(user.phone, codePhone.code)
        // } else {
        //     throw new ValidationException({
        // phone: await this.languageService.setError(['isNotVerify', 'noSendSMS']),
        //     })
        // }

        try {
            // Create accessToken and refreshToken
            const tokens = await this.jwt.generateTokens({ id: user.id })
            this.jwt.saveToken(user.id, tokens)

            return { ok: Boolean(user), ...tokens, user }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                email: await this.languageService.setError(['token', 'notCreated']),
            })
        }
    }

    /**
     * Update a user
     * @param body users object data from update  form
     * @param file { file: FileUpload } file object
     * @returns object, ok: true, false,
     */
    async updateAccount(body: UpdateAccountInput, file: FileUpload | null): Promise<UpdateAccountOutput> {
        // Find user in DB
        const currentUser: User = await this.jwt.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        if (!user) {
            throw new ValidationException({
                user: await this.languageService.setError(['isNotFound', 'user']),
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
            const updatedUser = await this.users.save({ ...user })
            return { ok: true, user: updatedUser }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                error: await this.languageService.setError(['isNot', 'updateUser']),
            })
        }
    }

    /**
     * Delete current user
     * @returns object, ok: true, false,
     */
    async deleteAccount(): Promise<DeleteAccountOutput> {
        try {
            const currentUser: User = await this.jwt.getContextUser(this.context)
            await this.files.deleteFiles(currentUser.id)
            await this.users.delete(currentUser.id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                error: await this.languageService.setError(['isNot', 'deleteUser']),
            })
        }
    }

    /**
     * Get data current user
     * @returns object, ok: true, false,
     */
    async myAccount(): Promise<MyAccountOutput> {
        const currentUser: User = await this.jwt.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id }, ...relationsConfig.users })
        // await this.files.setAvatar()
        if (!user) {
            throw new ForbiddenException({ auth: await this.languageService.setError(['isNotAuth', 'auth']) })
        }
        return { ok: Boolean(user), user }
    }

    /**
     * Find User by Id
     * @returns object, ok: true, false,
     */
    async findById({ id }: FindByIdInput): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { id }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                email: await this.languageService.setError(['isNot', 'foundUser']),
            })

        return { ok: Boolean(user), user }
    }

    /**
     * Find User by phone
     * @returns object, ok: true, false,
     */
    async findByPhone({ phone }: FindByPhoneInput): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { phone }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotFound', 'user']),
            })

        return { ok: Boolean(user), user }
    }

    /**
     * Find User by email
     * @returns object, ok: true, false,
     */
    async findByEmail({ email }: FindByEmailInput): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { email }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotFound', 'user']),
            })

        return { ok: Boolean(user), user }
    }

    /**
     * Find all users
     * @returns object, ok: true, false,
     */
    async findAllUsers(): Promise<FindAllUsersOutput> {
        const users = await this.users.find({ ...relationsConfig.users })
        if (!users.length)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotFound', 'user']),
            })

        return { ok: Boolean(users.length), users }
    }
}
