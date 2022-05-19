import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NotifiesService } from 'src/notifies/notifies.service'
import { ValidateService } from 'src/validate/validate.service'
import { Repository } from 'typeorm'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private notifiesService: NotifiesService,
        private validation: ValidateService,
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
        rePassword,
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
            const errorsExist = await this.notifiesService.notify('error', 'exist')
            const errorsField = await this.notifiesService.notify('error', 'field')

            // Check exist and return errror
            if (existEmail) return { ok: false, error: errorsExist.email }
            if (existPhone) return { ok: false, error: errorsExist.phone }

            ////Check field by empty or not
            const checkedFields = await this.validation.checkFields<CreateAccountInput>(errorsField, {
                fullname,
                experience,
                phone,
                email,
                password,
                rePassword,
            })
            console.log(checkedFields)
            // Create user if email and phone is not exist
            //const createdUser = this.users.create({accountData})

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
