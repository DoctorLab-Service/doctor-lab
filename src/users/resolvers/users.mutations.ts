import { UsersService } from './../users.service'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UpdateAccountInput, UpdateAccountOutput } from '../dtos/update-account.dto'
import { DeleteAccountOutput } from '../dtos/delete-account.dto'
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto'
import { UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { AccountValidationPipe } from '../pipes/account-validation.pipe'
import { AccessTokenCookieInterceptor } from 'src/jwt/token/cookie-token.interceptor'
import { LanguageService } from 'src/language/language.service'
import { ClearTokenCookieInterceptor } from 'src/jwt/token/clear-cookie-token.interceptor copy'

@Resolver()
export class UsersMutations {
    constructor(private readonly usersService: UsersService, private readonly languageService: LanguageService) {}

    @Mutation(() => CreateAccountOutput)
    @UsePipes(new AccountValidationPipe('users'))
    @UseInterceptors(new AccessTokenCookieInterceptor())
    async createAccount(@Args('input') body: CreateAccountInput): Promise<CreateAccountOutput> {
        const errors = await this.languageService.errors(['users', 'verify'])
        return this.usersService.createAccount(body, errors)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UpdateAccountOutput)
    @UsePipes(new AccountValidationPipe('users'))
    async updateAccount(@Args('input') body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        const errors = await this.languageService.errors(['users', 'auth'])
        return this.usersService.updateAccount(body, errors)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => DeleteAccountOutput)
    @UseInterceptors(new ClearTokenCookieInterceptor())
    async deleteAccount(): Promise<DeleteAccountOutput> {
        const errors = await this.languageService.errors(['users', 'auth'])
        return this.usersService.deleteAccount(errors)
    }
}
