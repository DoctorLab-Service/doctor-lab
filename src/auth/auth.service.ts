import { ValidationException } from './../exceptions/validation.exception'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from 'src/jwt/jwt.service'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { LoginInput, LoginOutput } from './dtos/login.dto'
import { LogoutInput, LogoutOutput } from './dtos/logout.dto'
import { RefreshTokenInput, RefreshTokenOutput } from './dtos/refresh-token.dto'

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>, private readonly jwt: JwtService) {}

    async login(body: LoginInput, errors?: any): Promise<LoginOutput> {
        const errorsExist: boolean = JSON.stringify(errors) !== '{}'
        let user

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
        if (errorsExist) {
            if (!user && (body.phone || body.email))
                throw new ValidationException({ [key]: errors.users.isNotExist[key] })
        } else {
            const eMsg = key === 'phone' ? `Invalid phone number` : key === 'email' && 'Invalid email address'
            if (!user && (body.phone || body.email)) throw new ValidationException({ [key]: eMsg })
        }
        if (!user && (body.facebookId || body.googleId)) throw new ValidationException({ [key]: `Invalid ${key}` })

        // Check Password
        if (!body.password && errorsExist) throw new ValidationException({ password: errors.users.isLength.password })

        const passwordCorrect = await user.checkPassword(body.password)
        if (!passwordCorrect && errorsExist)
            throw new ValidationException({ password: errors.users.isValid.passwordEqual })

        // Generate and save token
        const tokens = await this.jwt.generateTokens({ id: user.id })
        this.jwt.saveToken(user.id, tokens)

        return { ok: Boolean(user), ...tokens, user }
    }

    async logout({ refreshToken }: LogoutInput): Promise<LogoutOutput> {
        await this.jwt.removeToken(refreshToken)
        return { ok: true }
    }

    async refreshToken(body: RefreshTokenInput): Promise<RefreshTokenOutput> {
        return {}
    }
}
