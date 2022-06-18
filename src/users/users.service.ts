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
import { CONTEXT } from '@nestjs/graphql'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @Inject(CONTEXT) private context,
        @Inject(REQUEST) private request,
        private readonly jwt: JwtService,
    ) {}

    async createAccount(body: CreateAccountInput, errors?: any): Promise<CreateAccountOutput> {
        const errorsExist: boolean = JSON.stringify(errors) !== '{}'

        // Check by exist to email
        const existEmail = await this.users.findOne({ where: { email: body.email } })
        if (existEmail && errorsExist) throw new ValidationException({ email: errors.users.isExist.email })

        // Check by exist to phone
        const existPhone = await this.users.findOne({ where: { phone: body.phone } })
        if (existPhone && errorsExist) throw new ValidationException({ email: errors.users.isExist.phone })

        // Create user if email and phone is not exist
        const user = await this.users.save(this.users.create({ ...body }))
        if (!user && errorsExist) throw new ValidationException({ email: errors.users.isNotCreate.user })

        // Create Code for email and phone
        // const codeEmail = await this.verifyEmail.save(this.verifyEmail.create({ user }))
        // const codePhone = await this.verifyPhone.save(this.verifyPhone.create({ user }))

        // Send verification on email and phone
        // await this.emailService.sendVerificationEmail(user.email, user.fullname, codeEmail.code)
        // const phoneVerificationStatus = await this.phoneService.sendVerificationSMS(user.phone, codePhone.code)
        // if (!phoneVerificationStatus && args.length) throw new ValidationException({ phone:  args[0].verify.isNotVerify.noSendSMS })

        // Create accessToken and refreshToken
        const tokens = await this.jwt.generateTokens({ id: user.id })
        this.jwt.saveToken(user.id, tokens)

        return { ok: Boolean(user), ...tokens, user }
    }

    async updateAccount(body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        const cookies = this.request.cookies['refreshToken']
        return { ok: true }
    }

    async deleteAccount(body: DeleteAccountInput): Promise<DeleteAccountOutput> {
        console.log(body)
        return { ok: true }
    }

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
