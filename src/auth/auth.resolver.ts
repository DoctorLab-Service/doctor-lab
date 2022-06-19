import { Inject, UseGuards, UseInterceptors } from '@nestjs/common'
import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql'
import { ClearTokenCookieInterceptor } from 'src/jwt/token/clear-cookie-token.interceptor copy'
import { AccessTokenCookieInterceptor } from 'src/jwt/token/cookie-token.interceptor'
import { setLanguageMessage } from 'src/notifies/set-language'
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
        const errors = await setLanguageMessage({
            language: body.language,
            serviceName: ['users'],
            type: 'error',
        })
        const data = await this.authService.login(body, errors)
        return data
    }

    @Mutation(() => LogoutOutput)
    @UseInterceptors(new ClearTokenCookieInterceptor())
    async logout(): Promise<LogoutOutput> {
        const cookies = this.context.req.cookies
        return this.authService.logout(cookies)
    }

    @Mutation(() => RefreshTokenOutput)
    @UseInterceptors(new AccessTokenCookieInterceptor())
    async refreshToken(): Promise<RefreshTokenOutput> {
        const cookies = this.context.req.cookies
        return this.authService.refreshToken(cookies)
    }
}
