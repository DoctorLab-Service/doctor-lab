import * as jwt from 'jsonwebtoken'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from './entities/token.entity'
import { DeleteResult, Repository } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { JWT_TOKEN, tokenConfig } from './jwt.config'
import { GenerateTokens, JwtModuleOptions } from './types'
import { relationsConfig } from 'src/common/configs'

@Injectable()
export class JwtService {
    constructor(
        @InjectRepository(Token) private readonly token: Repository<Token>,
        @InjectRepository(User) private readonly users: Repository<User>,
        @Inject(CONFIG_OPTIONS) private readonly secrets: JwtModuleOptions,
    ) {}

    generateTokens(payload: any): GenerateTokens {
        const accessToken = jwt.sign(payload, this.secrets.accessSecret, tokenConfig.access)
        const refreshToken = jwt.sign(payload, this.secrets.refreshSecret, tokenConfig.refresh)

        return { accessToken, refreshToken }
    }

    async validateAccessToken(accessToken: string): Promise<User | null> {
        const token = await this.token.findOne({ where: { accessToken } })
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
    async getContextUser(context: any): Promise<User> {
        if (JWT_TOKEN in context.headers) {
            const accessToken = context.headers[JWT_TOKEN]
            const decoded = await this.validateAccessToken(accessToken.toString())
            if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                const user = await this.users.findOne({ where: { id: decoded.id }, ...relationsConfig.users })
                return user
            }
        }
    }
}
