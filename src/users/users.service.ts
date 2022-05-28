import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ValidationException } from 'src/exceptions/validation.exception'
import { NotifiesService } from 'src/notifies/notifies.service'
import { Repository } from 'typeorm'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import {
    FindAllByOutput,
    FindAllByRoleIenput,
    FindByEmailInput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
} from './dtos/find.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private notifiesService: NotifiesService,
    ) {}

    /*
     * Create new account
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
        success,
        role,
        language,
    }: CreateAccountInput): Promise<CreateAccountOutput> {
        this.notifiesService.init(language, 'users')

        try {
            // Check by exist to email and phone
            const existEmail = await this.users.findOne({ where: { email } })
            const existPhone = await this.users.findOne({ where: { phone } })

            // Change language for response error message
            const errorsMessage = await this.notifiesService.notify('error', 'isExist')

            // Check exist and return errror
            if (existEmail) throw new ValidationException({ email: errorsMessage.email })
            if (existPhone) throw new ValidationException({ phone: errorsMessage.phone })

            const newUser = {
                fullname,
                country,
                state,
                address,
                phone,
                email,
                experience,
                password,
                success,
                role,
                language,
            }

            // Create user if email and phone is not exist
            await this.users.save(this.users.create({ ...newUser }))

            return { ok: true }
        } catch (error) {
            console.log(error)
            const errorsMessage = await this.notifiesService.notify('error', 'isNotCreate')
            throw new ValidationException({ email: errorsMessage.user })
        }
    }

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
        - Role
    */
    async findAllByRole({ role, language }: FindAllByRoleIenput): Promise<FindAllByOutput> {
        this.notifiesService.init(language, 'users')
        const errorsMessage = await this.notifiesService.notify('error', 'isNotFound')

        try {
            const users = await this.users.find({ where: { role } })
            if (!users.length) throw new ValidationException({ email: errorsMessage.user })

            return { ok: Boolean(users.length), users }
        } catch (error) {
            throw new ValidationException({ email: errorsMessage.user })
        }
    }
}
