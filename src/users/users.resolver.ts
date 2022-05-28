import { UsePipes } from '@nestjs/common'
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { CreateAccountValidationPipe } from 'src/pipes/create-account-validation.pipe'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { FindByIdInput, FindByIdOutput } from './dtos/findOne.dto'
import { UserService } from './users.service'

@Resolver()
export class UserResolver {
    constructor(private readonly usersService: UserService) {}

    @Query(() => FindByIdOutput)
    async findById(@Args('id') id: FindByIdInput): Promise<FindByIdOutput> {
        console.log(id)
        return { ok: true }
    }

    @Mutation(() => CreateAccountOutput)
    @UsePipes(new CreateAccountValidationPipe())
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        return await this.usersService.createAccount(createAccountInput)
    }
}
