import { UsePipes } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto'
import { CreateAccountValidationPipe } from '../pipes/create-account-validation.pipe'
import { UserService } from '../users.service'

@Resolver()
export class UserMutations {
    constructor(private readonly usersService: UserService) {}

    @Mutation(() => CreateAccountOutput)
    @UsePipes(new CreateAccountValidationPipe())
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        return await this.usersService.createAccount(createAccountInput)
    }
}
