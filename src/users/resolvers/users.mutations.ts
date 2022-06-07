import { UsePipes } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { EmailService } from 'src/email/email.service'
import { PhoneService } from 'src/phone/phone.service'
import { CreateAccountValidationPipe } from 'src/pipes/create-account-validation.pipe'
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto'
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
