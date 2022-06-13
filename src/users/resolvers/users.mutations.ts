import { UsePipes } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { setLanguageMessage } from 'src/notifies/language'
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto'
import { CreateAccountValidationPipe } from '../pipes/create-account-validation.pipe'
import { UserService } from '../users.service'

@Resolver()
export class UserMutations {
    constructor(private readonly usersService: UserService) {}

    @Mutation(() => CreateAccountOutput)
    @UsePipes(new CreateAccountValidationPipe())
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        const errors = await setLanguageMessage({
            language: createAccountInput.language,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.createAccount(createAccountInput, errors)
    }
}
