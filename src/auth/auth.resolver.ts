import { Inject, UseInterceptors } from '@nestjs/common'
import { Args, CONTEXT, Mutation, Resolver } from '@nestjs/graphql'
import { ClearTokenCookieInterceptor } from 'src/jwt/token/clear-cookie-token.interceptor copy'
import { AccessTokenCookieInterceptor } from 'src/jwt/token/cookie-token.interceptor'
import { ELanguage } from 'src/language/dtos/languages.dto'
import { Messages } from 'src/language/dtos/notify.dto'
import { LanguageService } from 'src/language/language.service'
import { AuthService } from './auth.service'
import { LoginInput, LoginOutput } from './dtos/login.dto'
import { LogoutOutput } from './dtos/logout.dto'
import { RefreshTokenOutput } from './dtos/refresh-token.dto'

@Resolver()
export class AuthResolver {
    errors: Messages

    constructor(
        @Inject(CONTEXT) private context,
        private readonly authService: AuthService,
        private readonly languageService: LanguageService,
    ) {
        this.languageService.errors(['users']).then(res => (this.errors = res))
    }

    @Mutation(() => LoginOutput)
    @UseInterceptors(new AccessTokenCookieInterceptor())
    async login(@Args('input') body: LoginInput): Promise<LoginOutput> {
        return await this.authService.login(body, this.errors)
    }

    @Mutation(() => LogoutOutput)
    @UseInterceptors(new ClearTokenCookieInterceptor())
    async logout(): Promise<LogoutOutput> {
        const { cookies } = this.context.req
        return this.authService.logout(cookies, this.errors)
    }

    @Mutation(() => RefreshTokenOutput)
    @UseInterceptors(new AccessTokenCookieInterceptor())
    async refreshToken(): Promise<RefreshTokenOutput> {
        const { cookies } = this.context.req
        return this.authService.refreshToken(cookies, this.errors)
    }
}
