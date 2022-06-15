import { Injectable } from '@nestjs/common'
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

@Injectable()
export class UsersService {
    constructor(private readonly jwtService: JwtService) {}

    async createAccount(body: CreateAccountInput, errors): Promise<CreateAccountOutput> {
        return { ok: true, token: null }
    }

    async updateAccount(body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        console.log(body)
        return { ok: true }
    }

    async deleteAccount(body: DeleteAccountInput): Promise<DeleteAccountOutput> {
        console.log(body)
        return { ok: true }
    }

    async findById(body: FindByIdInput, errors): Promise<FindByOutput> {
        console.log(body)
        return { ok: true }
    }

    async findByPhone(body: FindByPhoneInput, errors): Promise<FindByOutput> {
        console.log(body)
        return { ok: true }
    }

    async findByEmail(body: FindByEmailInput, errors): Promise<FindByOutput> {
        console.log(body)
        return { ok: true }
    }

    async findAll(errors): Promise<FindAllOutput> {
        return { ok: true }
    }

    async findAllByRole(body: FindAllByRoleInput, errors): Promise<FindAllOutput> {
        console.log(body)
        return { ok: true }
    }
}
