import * as jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from './entities/token.entity'
import { DeleteResult, Repository } from 'typeorm'
import { User } from 'src/users/entities/user.entity'

type TGenerateTokens = {
    accessToken: string
    refreshToken: string
}

@Injectable()
export class JwtService {
    constructor(
        @InjectRepository(Token) private readonly token: Repository<Token>,
        private readonly config: ConfigService,
    ) {}

    generateTokens(payload: any): TGenerateTokens {
        console.log('payload:', payload)
        const accessToken = jwt.sign(payload, this.config.get('JWT_ACCESS_SECRET'), { expiresIn: '60m' })
        const refreshToken = jwt.sign(payload, this.config.get('JWT_REFRESH_SECRET'), { expiresIn: '30d' })

        return { accessToken, refreshToken }
    }

    async validateAccessToken(accessToken: string): Promise<User | null> {
        const token = await this.token.findOne({ where: { accessToken } })
        if (!token) throw new Error()
        return jwt.verify(token.accessToken, this.config.get('JWT_ACCESS_SECRET'))
    }

    async validateRefreshToken(token: string): Promise<User | null> {
        return jwt.verify(token, this.config.get('JWT_REFRESH_SECRET'))
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
}
