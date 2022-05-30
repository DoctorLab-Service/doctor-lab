import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ValidationException } from 'src/exceptions/validation.exception'
import { JwtService } from 'src/jwt/jwt.service'
import { NotifiesService } from 'src/notifies/notifies.service'
import { Repository } from 'typeorm'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import {
    FindAllOutput,
    FindAllByRoleInput,
    FindByEmailInput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
    FindAllInput,
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
        private notifiesService: NotifiesService,
        private jwtService: JwtService,
    ) {}

    /*
        Account: 
        + create
        - update
        - delete
        - verifyEmail
        - verifyPhone
        - addRole
        - updateRole
        - deleteRole
     */
    async createAccount({
        fullname,
        country,
        state,
        address,
        experience,
        phone,
        email,
        password,
        role,
        language,
    }: CreateAccountInput): Promise<CreateAccountOutput> {
        this.notifiesService.init(language, 'users')
        const errorsExist = await this.notifiesService.notify('error', 'isExist')
        const errorsCreate = await this.notifiesService.notify('error', 'isNotCreate')

        try {
            // Check by exist to email and phone
            const existEmail = await this.users.findOne({ where: { email } })
            const existPhone = await this.users.findOne({ where: { phone } })

            // Change language for response error message
            // Check exist and return errror
            if (existEmail) throw new ValidationException({ email: errorsExist.email })
            if (existPhone) throw new ValidationException({ phone: errorsExist.phone })

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
            if (!user) throw new ValidationException({ email: errorsCreate.user })

            const codeEmail = await this.verifyEmail.save(this.verifyEmail.create({ user }))
            const codePhone = await this.verifyPhone.save(this.verifyPhone.create({ user }))

            console.log('codeEmail', codeEmail)
            console.log('codePhone', codePhone)

            const token = this.jwtService.sign({ id: user.id })

            return { ok: true, token }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ email: errorsCreate.user })
        }
    }

    // async updateAccoun() {}
    // async deleteAccoun() {}

    // async verifyEmail() {}
    // async verifyphone() {}

    // async addRole() {}
    // async updateRole() {}
    // async deleteRole() {}
    /*
        Find By:
        - id
        - phone
        - email
     */
    async findById({ id, language }: FindByIdInput): Promise<FindByOutput> {
        this.notifiesService.init(language, 'users')
        const errorsMessage = await this.notifiesService.notify('error', 'isNotFound')

        try {
            const user = await this.users.findOne({ where: { id } })
            if (!user) throw new ValidationException({ email: errorsMessage.user })

            return { ok: Boolean(user), user }
        } catch (error) {
            throw new ValidationException({ email: errorsMessage.user })
        }
    }

    async findByPhone({ phone, language }: FindByPhoneInput): Promise<FindByOutput> {
        this.notifiesService.init(language, 'users')
        const errorsMessage = await this.notifiesService.notify('error', 'isNotFound')

        try {
            const user = await this.users.findOne({ where: { phone } })
            if (!user) throw new ValidationException({ email: errorsMessage.user })

            return { ok: Boolean(user), user }
        } catch (error) {
            throw new ValidationException({ email: errorsMessage.user })
        }
    }

    async findByEmail({ email, language }: FindByEmailInput): Promise<FindByOutput> {
        this.notifiesService.init(language, 'users')
        const errorsMessage = await this.notifiesService.notify('error', 'isNotFound')

        try {
            const user = await this.users.findOne({ where: { email } })
            if (!user) throw new ValidationException({ email: errorsMessage.user })

            return { ok: Boolean(user), user }
        } catch (error) {
            throw new ValidationException({ email: errorsMessage.user })
        }
    }

    /*
        Find All By:
        - All
        - Role
    */
    async findAll({ language }: FindAllInput): Promise<FindAllOutput> {
        this.notifiesService.init(language, 'users')
        const errorsMessage = await this.notifiesService.notify('error', 'isNotFound')

        try {
            const users = await this.users.find({})
            if (!users.length) throw new ValidationException({ email: errorsMessage.users })

            return { ok: Boolean(users.length), users }
        } catch (error) {
            throw new ValidationException({ email: errorsMessage.users })
        }
    }
    async findAllByRole({ role, language }: FindAllByRoleInput): Promise<FindAllOutput> {
        this.notifiesService.init(language, 'users')
        const errorsMessage = await this.notifiesService.notify('error', 'isNotFound')

        try {
            const users = await this.users.find({ where: { role } })
            if (!users.length) throw new ValidationException({ email: errorsMessage.users })

            return { ok: Boolean(users.length), users }
        } catch (error) {
            throw new ValidationException({ email: errorsMessage.users })
        }
    }
}
