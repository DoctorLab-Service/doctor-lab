import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ValidationException } from 'src/exceptions/validation.exception'
import { NotifiesService } from 'src/notifies/notifies.service'
import { Repository } from 'typeorm'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private notifiesService: NotifiesService,
    ) {}

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
        try {
            // Check by exist to email and phone
            const existEmail = await this.users.findOne({ where: { email } })
            const existPhone = await this.users.findOne({ where: { phone } })

            // Change language for response error message
            this.notifiesService.init(language, 'users')
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
            return {
                ok: false,
                error,
            }
        }
    }
}
