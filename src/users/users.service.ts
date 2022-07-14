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
import { UserRoles } from 'src/roles/entities/user_roles.entity'
import { MyAccountOutput } from './dtos/my-account.dto'

@Injectable()
export class UsersService {
    private user: User

    constructor(
        @Inject(CONTEXT) private readonly context,
        @InjectRepository(UserRoles) private readonly userRoles: Repository<UserRoles>,
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerificationEmail) private readonly verificationEmail: Repository<VerificationEmail>,
        @InjectRepository(VerificationPhone) private readonly verificationPhone: Repository<VerificationPhone>,
        private readonly jwt: JwtService,
        private readonly emailService: EmailService,
        private readonly phoneService: PhoneService,
        private readonly languageService: LanguageService,
    ) {
        this.jwt.getContextUser(this.context).then(user => (this.user = user))
    }

    /*
        Account actions
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

    async updateAccount(body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        // Find user in DB
        const user = await this.users.findOne({ where: { id: this.user.id }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                user: await this.languageService.setError(['isNotFound', 'user']),
            })

        try {
            user.avatar = body.avatar || user.avatar
            user.fullname = body.fullname || user.fullname
            user.country = body.country || user.country
            user.state = body.state || user.state
            user.address = body.address || user.address
            user.experience = body.experience || user.experience
            user.language = body.language || user.language
            user.birthdate = body.birthdate || user.birthdate

            const updatedUser = await this.users.save({ ...user })
            return { ok: true, user: updatedUser }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                error: await this.languageService.setError(['isNot', 'updateUser']),
            })
        }
    }

    async deleteAccount(): Promise<DeleteAccountOutput> {
        try {
            await this.users.delete(this.user.id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                error: await this.languageService.setError(['isNot', 'deleteUser']),
            })
        }
    }

    async myAccount(): Promise<MyAccountOutput> {
        const user = await this.users.findOne({ where: { id: this.user.id }, ...relationsConfig.user })
        if (!user) {
            throw new ForbiddenException({ auth: await this.languageService.setError(['isNotAuth', 'auth']) })
        }
        return { ok: Boolean(user), user }
    }

    /*
        Finds By ...
    */
    async findById({ id }: FindByIdInput): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { id }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                email: await this.languageService.setError(['isNot', 'foundUser']),
            })

        return { ok: Boolean(user), user }
    }

    async findByPhone({ phone }: FindByPhoneInput): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { phone }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotFound', 'user']),
            })

        return { ok: Boolean(user), user }
    }

    async findByEmail({ email }: FindByEmailInput): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { email }, ...relationsConfig.users })
        if (!user)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotFound', 'user']),
            })

        return { ok: Boolean(user), user }
    }

    async findAllUsers(): Promise<FindAllUsersOutput> {
        const users = await this.users.find({ ...relationsConfig.users })
        if (!users.length)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotFound', 'user']),
            })

        return { ok: Boolean(users.length), users }
    }
}
