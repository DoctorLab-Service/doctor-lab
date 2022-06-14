import { Injectable } from '@nestjs/common'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { DeleteAccountInput, DeleteAccountOutput } from './dtos/delete-account.dto'
import { UpdateAccountInput, UpdateAccountOutput } from './dtos/update-account.dto'

@Injectable()
export class UsersService {
    async createAccount(body: CreateAccountInput): Promise<CreateAccountOutput> {
        console.log(body)
        return { ok: true, token: null }
    }

    async updateAccount(body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        console.log(body)
        return { ok: true }
    }

    async deleteAccount(userId: DeleteAccountInput): Promise<DeleteAccountOutput> {
        console.log(userId)
        return { ok: true }
    }
}
