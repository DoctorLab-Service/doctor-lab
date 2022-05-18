import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { UserService } from './users.service'

@Resolver()
export class UserResolver {
    constructor(private readonly usersService: UserService) {}

    @Query(() => String)
    hi(): string {
        return 'Hello'
    }

    @Mutation(() => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        return await this.usersService.createAccount(createAccountInput)
    }
}
