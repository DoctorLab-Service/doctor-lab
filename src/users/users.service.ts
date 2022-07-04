import { User } from 'src/users/entities/user.entity'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ValidationException } from 'src/exceptions/validation.exception'
import { JwtService } from 'src/jwt/jwt.service'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { DeleteAccountInput, DeleteAccountOutput } from './dtos/delete-account.dto'
import {
    FindAllByRoleInput,
    FindAllOutput,
    FindByEmailInput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
} from './dtos/find.dto'
import { UpdateAccountInput, UpdateAccountOutput } from './dtos/update-account.dto'
import { Repository } from 'typeorm'
import { VerificationEmail } from 'src/verifications/entities/verification-email.entiry'
import { VerificationPhone } from 'src/verifications/entities/verification-phone.entiry'
import { EmailService } from 'src/email/email.service'
import { PhoneService } from 'src/phone/phone.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerificationEmail) private readonly verificationEmail: Repository<VerificationEmail>,
        @InjectRepository(VerificationPhone) private readonly verificationPhone: Repository<VerificationPhone>,
        private readonly jwt: JwtService,
        private readonly emailService: EmailService,
        private readonly phoneService: PhoneService,
    ) {}

    /*
        Account
    */
    async createAccount(body: CreateAccountInput, errors?: any): Promise<CreateAccountOutput> {
        const errorsExist: boolean = JSON.stringify(errors) !== '{}'
        // Check by exist to email
        const existEmail = await this.users.findOne({ where: { email: body.email } })
        if (existEmail)
            throw new ValidationException({
                email: errorsExist ? errors.users.isExist.email : 'There is user with that email already',
            })

        // Check by exist to phone
        const existPhone = await this.users.findOne({ where: { phone: body.phone } })
        if (existPhone)
            throw new ValidationException({
                email: errorsExist ? errors.users.isExist.phone : 'There is user with that phone already',
            })

        // Create user if email and phone is not exist
        const user = await this.users.save(this.users.create({ ...body }))
        if (!user)
            throw new ValidationException({
                email: errorsExist ? errors.users.isNotCreate.user : "Couldn't create account",
            })

        // Create Code for email and phone
        const codeEmail = await this.verificationEmail.save(this.verificationEmail.create({ user }))
        const codePhone = await this.verificationPhone.save(this.verificationPhone.create({ user }))

        // Send verification on email and phone
        if (codeEmail) {
            await this.emailService.sendVerificationEmail(user.email, user.fullname, codeEmail.code)
        } else {
            throw new ValidationException({
                phone: errorsExist ? errors.verify.isNotVerify.noSendEmail : 'Unable to send you email',
            })
        }

        // if (codePhone) {
        //     await this.phoneService.sendVerificationSMS(user.phone, codePhone.code)
        // } else {
        //     throw new ValidationException({
        //         phone: errorsExist ? errors.verify.isNotVerify.noSendSMS : 'Unable to send you SMS',
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
                email: errorsExist ? errors.users.isNotCreate.token : "Couldn't create token, try to login",
            })
        }
    }

    async updateAccount(body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        return { ok: true }
    }

    async deleteAccount(body: DeleteAccountInput): Promise<DeleteAccountOutput> {
        console.log(body)
        return { ok: true }
    }

    /*
        Finds By ...
    */
    async findById({ id }: FindByIdInput, errors?: any): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { id } })
        if (!user && JSON.stringify(errors) !== '{}')
            throw new ValidationException({ email: errors.users.isNotFound.user })

        return { ok: Boolean(user), user }
    }

    async findByPhone({ phone }: FindByPhoneInput, errors?: any): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { phone } })
        if (!user && JSON.stringify(errors) !== '{}')
            throw new ValidationException({ email: errors.users.isNotFound.user })

        return { ok: Boolean(user), user }
    }

    async findByEmail({ email }: FindByEmailInput, errors?: any): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { email } })
        if (!user && JSON.stringify(errors) !== '{}')
            throw new ValidationException({ email: errors.users.isNotFound.user })

        return { ok: Boolean(user), user }
    }

    async findAll(errors?: any): Promise<FindAllOutput> {
        const users = await this.users.find({})
        if (!users.length && JSON.stringify(errors) !== '{}')
            throw new ValidationException({ email: errors.users.isNotFound.user })

        return { ok: Boolean(users.length), users }
    }

    async findAllByRole({ role }: FindAllByRoleInput, errors?: any): Promise<FindAllOutput> {
        const users = await this.users.find({ where: { role } })
        if (!users.length && JSON.stringify(errors) !== '{}')
            throw new ValidationException({ email: errors.users.isNotFound.user })

        return { ok: Boolean(users.length), users }
    }
}
