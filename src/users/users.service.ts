import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EmailService } from 'src/email/email.service'
import { ValidationException } from 'src/exceptions/validation.exception'
import { JwtService } from 'src/jwt/jwt.service'
import { PhoneService } from 'src/phone/phone.service'
import { Repository } from 'typeorm'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import {
    FindAllOutput,
    FindAllByRoleInput,
    FindByEmailInput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
} from './dtos/find.dto'
import { User } from './entities/user.entity'
import { VerifyEmail } from './entities/verify-email.entity'
import { VerifyPhone } from './entities/verify-phone.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerifyEmail) private readonly verifyEmail: Repository<VerifyEmail>,
        @InjectRepository(VerifyPhone) private readonly verifyPhone: Repository<VerifyPhone>,
        private emailService: EmailService,
        private phoneService: PhoneService,
        private jwtService: JwtService,
    ) {}

    async createAccount(
        { fullname, country, state, address, experience, phone, email, password, role, language }: CreateAccountInput,
        ...args
    ): Promise<CreateAccountOutput> {
        // Check by exist to email and phone
        const existEmail = await this.users.findOne({ where: { email } })
        if (existEmail && args.length) throw new ValidationException({ email: args[0].users.isExist.email })
        const existPhone = await this.users.findOne({ where: { phone } })
        if (existPhone && args.length) throw new ValidationException({ phone: args[0].users.isExist.phone })

        const newUser = {
            fullname,
            country,
            state,
            address,
            phone,
            email,
            experience,
            password,
            role,
            language,
        }

        // Create user if email and phone is not exist
        const user = await this.users.save(this.users.create({ ...newUser }))
        // if (!user && args.length) throw new ValidationException({ email: args[0].users.isNotCreate.user })
        if (user && args.length) throw new ValidationException({ email: args[0].users.isNotCreate.user })

        const codeEmail = await this.verifyEmail.save(this.verifyEmail.create({ user }))
        const codePhone = await this.verifyPhone.save(this.verifyPhone.create({ user }))

        await this.emailService.sendVerificationEmail(user.email, user.fullname, codeEmail.code)
        // const phoneVerificationStatus = await this.phoneService.sendVerificationSMS(user.phone, codePhone.code)
        // if (!phoneVerificationStatus && args.length) throw new ValidationException({ phone:  args[0].verify.isNotVerify.noSendSMS })

        const token = this.jwtService.sign({ id: user.id })

        return { ok: true, token }
    }

    // async updateAccoun() {}
    // async deleteAccoun() {}

    async findById({ id }: FindByIdInput, ...args): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { id } })
        if (!user && args.length) throw new ValidationException({ email: args[0].users.isNotFound.user })

        return { ok: Boolean(user), user }
    }

    async findByPhone({ phone }: FindByPhoneInput, ...args): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { phone } })
        if (!user && args.length) throw new ValidationException({ email: args[0].users.isNotFound.user })

        return { ok: Boolean(user), user }
    }

    async findByEmail({ email }: FindByEmailInput, ...args): Promise<FindByOutput> {
        const user = await this.users.findOne({ where: { email } })
        if (!user && args.length) throw new ValidationException({ email: args[0].users.isNotFound.user })

        return { ok: Boolean(user), user }
    }

    /*
        Find All By:
        - All
        - Role
    */
    async findAll(...args): Promise<FindAllOutput> {
        const users = await this.users.find({})
        if (!users.length && args.length) throw new ValidationException({ email: args[0].users.isNotFound.users })

        return { ok: Boolean(users.length), users }
    }

    async findAllByRole({ role }: FindAllByRoleInput, ...args): Promise<FindAllOutput> {
        const users = await this.users.find({ where: { role } })
        if (!users.length && args.length) throw new ValidationException({ email: args[0].users.isNotFound.users })

        return { ok: Boolean(users.length), users }
    }
}
