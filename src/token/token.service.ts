import * as jwt from 'jsonwebtoken'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from './entities'
import { DeleteResult, Repository } from 'typeorm'
import { User } from 'src/users/entities'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { tokenConfig } from './config/token.config'
import { ForbiddenException } from 'src/exceptions'
import { LanguageService } from 'src/language/language.service'
import { GenerateTokens, TokenModuleOptions } from './config/types'
import { relationsConfig } from 'src/common/configs'
import { tokenKey } from './config/token.enums'

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token) private readonly token: Repository<Token>,
        @InjectRepository(User) private readonly users: Repository<User>,
        @Inject(CONFIG_OPTIONS) private readonly secrets: TokenModuleOptions,
        private readonly languageService: LanguageService,
    ) {}

    generateTokens(payload: any, recovery = false): GenerateTokens {
        let recoveryToken = null
        if (recovery) {
            recoveryToken = jwt.sign(payload, this.secrets.accessSecret, tokenConfig.recovery)
        }
        const accessToken = jwt.sign(payload, this.secrets.accessSecret, tokenConfig.access)
        const refreshToken = jwt.sign(payload, this.secrets.refreshSecret, tokenConfig.refresh)

        return { accessToken, refreshToken, recoveryToken }
    }

    async validateAccessToken(accessToken: string): Promise<User | null> {
        const token = await this.token.findOne({ where: { accessToken } })

        if (!token) {
            throw new Error()
        }
        return jwt.verify(token.accessToken, this.secrets.accessSecret)
    }

    async validateRefreshToken(token: string): Promise<User | null> {
        return jwt.verify(token, this.secrets.refreshSecret)
    }

    async saveToken(user, tokens): Promise<Token | Token[]> {
        const tokenData = await this.token.findOne({ where: { user } })
        if (tokenData) {
            tokenData.accessToken = tokens.accessToken
            tokenData.refreshToken = tokens.refreshToken
            return this.token.save(tokenData)
        }
        const token = await this.token.save(this.token.create({ user, ...tokens }))
        return token
    }

    async removeToken(refreshToken: string): Promise<DeleteResult> {
        return this.token.delete({ refreshToken })
    }

    async removeExpiredAccessToken(accessToken: string): Promise<boolean> {
        const token = await this.token.findOne({ where: { accessToken } })
        token.accessToken = null
        const newToken = await this.token.save({ ...token })
        if (newToken.accessToken !== null) return false
        return true
    }

    async findToken(refreshToken: string) {
        return this.token.findOne({ where: { refreshToken } })
    }

    /**
     * Get User from context headers
     * @param context any
     * @returns User object
     */
    async getContextUser(context: any): Promise<User | null> {
        if (context) {
            let headers = context.headers
            if (headers === undefined) {
                headers = context.req.headers
            }

            let user: User

            // JWT TOKEN
            if (tokenKey.JWT in headers) {
                const accessToken = headers[tokenKey.JWT]
                if (!accessToken) {
                    throw new ForbiddenException({
                        auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                    })
                }

                const decoded = await this.validateAccessToken(accessToken.toString())
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    user = await this.users.findOne({ where: { id: decoded.id }, ...relationsConfig.users })
                    return user
                }
            }

            // JWT RECOVERY TOTEN
            if (tokenKey.RECOVERY_JWT in headers) {
                const accessToken = headers[tokenKey.RECOVERY_JWT]
                if (!accessToken) {
                    throw new ForbiddenException({
                        auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                    })
                }

                const decoded = await this.validateAccessToken(accessToken.toString())
                if (typeof decoded === 'object' && decoded.hasOwnProperty('phone')) {
                    const user = await this.users.findOne({ where: { phone: decoded.phone }, ...relationsConfig.users })
                    return user
                }
                if (typeof decoded === 'object' && decoded.hasOwnProperty('email')) {
                    user = await this.users.findOne({ where: { email: decoded.email }, ...relationsConfig.users })
                    return user
                }
            }

            if (!user) {
                throw new ForbiddenException({
                    auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                })
            }
        }
    }
}
