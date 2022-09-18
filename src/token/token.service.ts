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
import { tokenKey } from './config/token.enums'

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token) private readonly token: Repository<Token>,
        @InjectRepository(User) private readonly users: Repository<User>,
        @Inject(CONFIG_OPTIONS) private readonly secrets: TokenModuleOptions,
        private readonly languageService: LanguageService,
    ) {}

    /**
     * Generate tokens
     * @param payload object data for creating jwt
     * @param recovery boolean, if recovery set true, default false
     * @returns tokens object { accessToken, refreshToken, recoveryToken }
     */
    generateTokens(payload: any, recovery = false): GenerateTokens {
        let recoveryToken = null
        if (recovery) {
            recoveryToken = jwt.sign(payload, this.secrets.recoverySecret, tokenConfig.recovery)
        }
        const accessToken = jwt.sign(payload, this.secrets.accessSecret, tokenConfig.access)
        const refreshToken = jwt.sign(payload, this.secrets.refreshSecret, tokenConfig.refresh)

        return { accessToken, refreshToken, recoveryToken }
    }

    /**
     * Check to validation token
     * @param key: 'recoveryToken' | 'accessToken' | 'refreshToken'
     * @param token: string
     * @returns veridied token
     */
    async validateToken(key: 'recoveryToken' | 'accessToken' | 'refreshToken', token: string): Promise<User | null> {
        const candidate = await this.token.findOne({ where: { [key]: token } })
        if (!candidate) {
            throw new Error()
        }
        const secret =
            key === 'accessToken' ? 'accessSecret' : key === 'recoveryToken' ? 'recoverySecret' : 'refreshSecret'

        return jwt.verify(token, this.secrets[secret])
    }

    /**
     * Find refresh token
     * @param refreshToken string
     * @returns founds tokens
     */
    async findToken(key: 'recoveryToken' | 'accessToken' | 'refreshToken', token: string) {
        return this.token.findOne({ where: { [key]: token } })
    }

    /**
     * Save token to database
     * @param user User
     * @param tokens  { accessToken, refreshToken, recoveryToken }
     * @returns token
     */
    async saveTokens(user, tokens): Promise<Token | Token[]> {
        const tokenData = await this.token.findOne({ where: { user } })
        if (tokenData) {
            tokenData.accessToken = tokens.accessToken || null
            tokenData.recoveryToken = tokens.recoveryToken || null
            tokenData.refreshToken = tokens.refreshToken || null
            return this.token.save(tokenData)
        }
        const token = await this.token.save(this.token.create({ user, ...tokens }))
        return token
    }

    /**
     * Remove token by refresh token from database
     * @param refreshToken string
     * @returns deleted object
     */
    async removeToken(refreshToken: string): Promise<DeleteResult> {
        return this.token.delete({ refreshToken })
    }

    /**
     * Remove expired acces token
     * @param key recoveryToken | accessToken | refreshToken
     * @param token string
     * @returns boolean
     */
    async removeExpiredToken(key: 'recoveryToken' | 'accessToken' | 'refreshToken', token: string): Promise<boolean> {
        const candidate = await this.token.findOne({ where: { [key]: token } })
        candidate[key] = null
        const newToken = await this.token.save({ ...candidate })
        if (newToken[key] !== null) return false
        return true
    }

    /**
     * Remove token by user id
     * @param userId number, user id
     */
    async removeTokenByUserId(userId: number): Promise<void> {
        // Check to exists tokens for this user
        const tokens = await this.token.find({})
        const existsToken = tokens.filter(t => t.user.id === userId)
        // If token exists to delete
        if (existsToken.length) {
            await this.token.delete(existsToken[0].id)
            return
        }
        return
    }

    /**
     * Get User from context headers
     * @param context any
     * @returns User object
     */
    async getContextUser(context: any): Promise<User | null> {
        if (context) {
            let user: User
            let headers = context.headers
            if (headers === undefined) {
                headers = context.req.headers
            }

            // JWT TOKEN
            if (tokenKey.JWT in headers) {
                const accessToken = headers[tokenKey.JWT]
                if (!accessToken) {
                    throw new ForbiddenException({
                        auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                    })
                }

                const decoded = await this.validateToken('accessToken', accessToken.toString())
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    user = await this.users.findOne({ where: { id: decoded.id } })
                    return user
                }
            }

            // JWT RECOVERY TOTEN
            if (tokenKey.RECOVERY_JWT in headers) {
                const recoveryToken = headers[tokenKey.RECOVERY_JWT]
                if (!recoveryToken) {
                    throw new ForbiddenException({
                        auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                    })
                }

                const decoded = await this.validateToken('recoveryToken', recoveryToken.toString())
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    const user = await this.users.findOne({ where: { id: decoded.id } })
                    return user
                }
            }

            if (!user) {
                throw new ForbiddenException({
                    auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                })
            }
            return user
        }
    }
}
