import { ForbiddenException, ValidationException } from 'src/exceptions'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TokenService } from 'src/token/token.service'
import { Repository } from 'typeorm'
import { LanguageService } from 'src/language/language.service'
import { User } from 'src/users/entities'
import { checkPassword } from 'src/users/helpers'
import { LoginInput, LoginOutput, LogoutInput, LogoutOutput, RefreshTokenInput, RefreshTokenOutput } from './dtos'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly token: TokenService,
        private readonly languageService: LanguageService,
    ) {}

    async login(body: LoginInput): Promise<LoginOutput> {
        let user: User
        // Login by email
        if (body.email) {
            user = await this.users.findOne({ where: { email: body.email } })
        }
        // Login by phone
        if (body.phone) {
            user = await this.users.findOne({ where: { phone: body.phone } })
        }
        // Login by facebookId
        if (body.facebookId) {
            user = await this.users.findOne({ where: { facebookId: body.facebookId } })
        }
        // Login by googleId
        if (body.googleId) {
            user = await this.users.findOne({ where: { googleId: body.googleId } })
        }

        // If no exist user send error
        const key = body.email
            ? 'email'
            : body.phone
            ? 'phone'
            : body.facebookId
            ? 'facebookId'
            : body.googleId && 'googleId'

        if (!user && (body.phone || body.email)) {
            throw new ValidationException({
                [key]: await this.languageService.setError(['isNotExist', key]),
            })
        }

        if (!user && (body.facebookId || body.googleId)) {
            throw new ValidationException({ [key]: await this.languageService.setError(['isValid', key]) })
        }

        // Check Password
        const passwordCorrect = await checkPassword(body.password, user.password)
        if (!passwordCorrect) {
            throw new ValidationException({
                password: await this.languageService.setError(['isValid', 'passwordEqual']),
            })
        }

        // Generate and save token
        const tokens = await this.token.generateTokens({ id: user.id })
        if (!tokens.accessToken.length || !tokens.refreshToken.length) {
            throw new ValidationException({
                create: await this.languageService.setError(['token', 'notCreated']),
            })
        }

        await this.token.saveTokens(user.id, tokens)

        return { ok: Boolean(user), ...tokens, user }
    }

    async logout({ refreshToken }: LogoutInput): Promise<LogoutOutput> {
        if (!refreshToken) {
            throw new ForbiddenException({
                auth: await this.languageService.setError(['isNotAuth', 'auth']),
            })
        }

        await this.token.removeToken(refreshToken)
        return { ok: true }
    }

    async refreshToken({ refreshToken }: RefreshTokenInput): Promise<RefreshTokenOutput> {
        if (!refreshToken) {
            throw new ForbiddenException({
                auth: await this.languageService.setError(['isNotAuth', 'auth']),
            })
        }

        // Check refresh token in db and validate it
        const userData = await this.token.validateToken('refreshToken', refreshToken)
        const tokenFromDb = await this.token.findToken('refreshToken', refreshToken)
        if (!userData || !tokenFromDb) {
            throw new ForbiddenException({
                auth: await this.languageService.setError(['isNotAuth', 'auth']),
            })
        }

        const user = await this.users.findOne({ where: { id: userData.id } })
        if (!user) {
            throw new ForbiddenException({
                auth: await this.languageService.setError(['isNotAuth', 'auth']),
            })
        }

        const tokens = this.token.generateTokens({ id: user.id })
        if (!tokens.accessToken && !tokens.refreshToken) {
            throw new ForbiddenException({
                auth: await this.languageService.setError(['isNotAuth', 'auth']),
            })
        }

        await this.token.saveTokens(user.id, tokens)
        return { ok: true, ...tokens, user }
    }
}
