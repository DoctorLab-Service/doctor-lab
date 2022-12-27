import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as jwt from 'jsonwebtoken'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { User } from 'src/users/entities'
import { DeleteResult, Repository } from 'typeorm'
import { tokenConfig } from './config/token.config'
import { GenerateTokens, TokenModuleOptions } from './config/types'
import { Token } from './entities'

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token) private readonly token: Repository<Token>,
        @Inject(CONFIG_OPTIONS) private readonly secrets: TokenModuleOptions,
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
    async findToken(key: 'recoveryToken' | 'accessToken' | 'refreshToken', token: string): Promise<Token> {
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
}
