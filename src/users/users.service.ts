import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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
            const errors = await this.notifiesService.notify('error', 'exist')

            // Check exist and return errror
            if (existEmail) return { ok: false, error: errors.email }
            if (existPhone) return { ok: false, error: errors.phone }

            //Che

            // Create user if email and phone is not exist
            const createdUser = await this.users.create(accountData)
            console.log(createdUser)

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
