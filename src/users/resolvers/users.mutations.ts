import { UsersService } from './../users.service'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateAccountInput, CreateAccountOutput } from './../dtos/create-account.dto'
import { UpdateAccountInput, UpdateAccountOutput } from '../dtos/update-account.dto'
import { DeleteAccountInput, DeleteAccountOutput } from '../dtos/delete-account.dto'

@Resolver()
export class UsersMutations {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => CreateAccountOutput)
    async createAccount(@Args('input') body: CreateAccountInput): Promise<CreateAccountOutput> {
        return this.usersService.createAccount(body)
    }

    @Mutation(() => UpdateAccountOutput)
    async updateAccount(@Args('input') body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        return this.usersService.updateAccount(body)
    }

    @Mutation(() => DeleteAccountOutput)
    async deleteAccount(@Args('userId') userId: DeleteAccountInput): Promise<DeleteAccountOutput> {
        return this.usersService.deleteAccount(userId)
    }
}
