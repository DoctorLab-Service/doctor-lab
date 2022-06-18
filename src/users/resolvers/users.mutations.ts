import { UsersService } from './../users.service'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UpdateAccountInput, UpdateAccountOutput } from '../dtos/update-account.dto'
import { DeleteAccountInput, DeleteAccountOutput } from '../dtos/delete-account.dto'
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto'
import { setLanguageMessage } from 'src/notifies/set-language'
import { UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { AccountValidationPipe } from '../pipes/account-validation.pipe'
import { AccessTokenCookieInterceptor } from 'src/jwt/token/cookie-token.interceptor'

@Resolver()
export class UsersMutations {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => CreateAccountOutput)
    @UsePipes(new AccountValidationPipe('users'))
    @UseInterceptors(new AccessTokenCookieInterceptor())
    async createAccount(@Args('input') body: CreateAccountInput): Promise<CreateAccountOutput> {
        const errors = await setLanguageMessage({
            language: body.language,
            serviceName: ['users'],
            type: 'error',
        })
        return this.usersService.createAccount(body, errors)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UpdateAccountOutput)
    // @UseInterceptors(new AccessTokenCookieInterceptor())
    async updateAccount(@Args('input') body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        return this.usersService.updateAccount(body)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => DeleteAccountOutput)
    async deleteAccount(@Args('input') id: DeleteAccountInput): Promise<DeleteAccountOutput> {
        return this.usersService.deleteAccount(id)
    }
}
