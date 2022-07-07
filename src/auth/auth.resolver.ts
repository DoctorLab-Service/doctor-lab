import { Inject, UseInterceptors } from '@nestjs/common'
import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql'
import { ClearTokenCookieInterceptor } from 'src/jwt/interceptors/clear-cookie-token.interceptor'
import { AccessTokenCookieInterceptor } from 'src/jwt/interceptors/cookie-token.interceptor'
import { AuthService } from './auth.service'
import { LoginInput, LoginOutput } from './dtos/login.dto'
import { LogoutOutput } from './dtos/logout.dto'
import { RefreshTokenOutput } from './dtos/refresh-token.dto'

@Resolver()
export class AuthResolver {
    constructor(@Inject(CONTEXT) private context, private readonly authService: AuthService) {}

    @Mutation(() => LoginOutput)
    @UseInterceptors(new AccessTokenCookieInterceptor())
    async login(@Args('input') body: LoginInput): Promise<LoginOutput> {
        return await this.authService.login(body)
    }

    @Mutation(() => LogoutOutput)
    @UseInterceptors(new ClearTokenCookieInterceptor())
    async logout(): Promise<LogoutOutput> {
        const { cookies } = this.context.req
        return this.authService.logout(cookies)
    }

    @Mutation(() => RefreshTokenOutput)
    @UseInterceptors(new AccessTokenCookieInterceptor())
    async refreshToken(): Promise<RefreshTokenOutput> {
        const { cookies } = this.context.req
        return this.authService.refreshToken(cookies)
    }
}
