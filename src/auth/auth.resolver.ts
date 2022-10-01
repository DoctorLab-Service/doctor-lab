import { UseInterceptors } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { LenguageInterceptor } from 'src/language/language.interceptor'
import { AccessTokenCookieInterceptor, ClearTokenCookieInterceptor } from 'src/token/interceptors'
import { AuthService } from './auth.service'
import { LoginInput, LoginOutput } from './dtos/login.dto'
import { LogoutOutput } from './dtos/logout.dto'
import { RefreshTokenOutput } from './dtos/refresh-token.dto'

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => LoginOutput)
    @UseInterceptors(new LenguageInterceptor(), new AccessTokenCookieInterceptor())
    async login(@Args('input') body: LoginInput): Promise<LoginOutput> {
        return this.authService.login(body)
    }

    @Mutation(() => LogoutOutput)
    @UseInterceptors(new ClearTokenCookieInterceptor())
    async logout(@Context() context: any): Promise<LogoutOutput> {
        const { cookies } = context.req
        return this.authService.logout(cookies)
    }

    @Mutation(() => RefreshTokenOutput)
    @UseInterceptors(new AccessTokenCookieInterceptor())
    async refreshToken(@Context() context: any): Promise<RefreshTokenOutput> {
        const { cookies } = context.req
        return this.authService.refreshToken(cookies)
    }
}
