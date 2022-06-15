import { UsersService } from './../users.service'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateAccountInput, CreateAccountOutput } from './../dtos/create-account.dto'
import { UpdateAccountInput, UpdateAccountOutput } from '../dtos/update-account.dto'
import { DeleteAccountInput, DeleteAccountOutput } from '../dtos/delete-account.dto'
import { UsePipes } from '@nestjs/common'
import { AccountValidationPipe } from '../pipes/account-validation.pipe'
import { setLanguageMessage } from 'src/notifies/set-language'

@Resolver()
export class UsersMutations {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => CreateAccountOutput)
    @UsePipes(new AccountValidationPipe('users'))
    async createAccount(@Args('input') body: CreateAccountInput): Promise<CreateAccountOutput> {
        const errors = await setLanguageMessage({
            language: body.language,
            serviceName: ['users'],
            type: 'error',
        })
        return this.usersService.createAccount(body, errors)
    }

    @Mutation(() => UpdateAccountOutput)
    async updateAccount(@Args('input') body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        return this.usersService.updateAccount(body)
    }

    @Mutation(() => DeleteAccountOutput)
    async deleteAccount(@Args('input') id: DeleteAccountInput): Promise<DeleteAccountOutput> {
        return this.usersService.deleteAccount(id)
    }
}
