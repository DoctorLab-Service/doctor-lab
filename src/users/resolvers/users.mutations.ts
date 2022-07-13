import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { UpdateAccountInput, UpdateAccountOutput } from '../dtos/update-account.dto'
import { DeleteAccountOutput } from '../dtos/delete-account.dto'
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto'
import { UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { AuthGuard } from 'src/auth/auth.guard'
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { AccessTokenCookieInterceptor } from 'src/jwt/interceptors/cookie-token.interceptor'
import { ClearTokenCookieInterceptor } from 'src/jwt/interceptors/clear-cookie-token.interceptor'
import { LenguageInterceptor } from 'src/language/language.interceptor'
import { UsersService } from '../users.service'

@Resolver()
export class UsersMutations {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => CreateAccountOutput)
    @UseInterceptors(new LenguageInterceptor(), new AccessTokenCookieInterceptor())
    @UsePipes(new ValidationPipe('users'))
    async createAccount(@Args('input') body: CreateAccountInput): Promise<CreateAccountOutput> {
        return this.usersService.createAccount(body)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => UpdateAccountOutput)
    @UsePipes(new ValidationPipe('users'))
    async updateAccount(@Args('input') body: UpdateAccountInput): Promise<UpdateAccountOutput> {
        return this.usersService.updateAccount(body)
    }

    @UseGuards(AuthGuard)
    @Mutation(() => DeleteAccountOutput)
    @UseInterceptors(new ClearTokenCookieInterceptor())
    async deleteAccount(): Promise<DeleteAccountOutput> {
        return this.usersService.deleteAccount()
    }
}
