import { ForbidenException } from './../exceptions/forbiden.exception'
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
                [key]: errorsExist ? errors.users.isNotExist[key] : `There is user with that ${key} already`,
            })
        }

        if (!user && (body.facebookId || body.googleId)) throw new ValidationException({ [key]: `Invalid ${key}` })

        // Check Password
        if (!body.password)
            throw new ValidationException({
                password: errorsExist
                    ? errors.users.isLength.password
                    : 'Password must be longer than or equal to 6 characters',
            })

        const passwordCorrect = await user.checkPassword(body.password)
        if (!passwordCorrect)
            throw new ValidationException({
                password: errorsExist ? errors.users.isValid.passwordEqual : "Passwords don't match",
            })

        // Generate and save token
        const tokens = await this.jwt.generateTokens({ id: user.id })
        this.jwt.saveToken(user.id, tokens)

        return { ok: Boolean(user), ...tokens, user }
    }

    async logout({ refreshToken }: LogoutInput, errors?: any): Promise<LogoutOutput> {
        const errorsExist: boolean = JSON.stringify(errors) !== '{}'

        if (!refreshToken)
            throw new ForbidenException({ auth: errorsExist ? errors.auth.isNotAuth.auth : 'User is not authorized' })

        try {
            await this.jwt.removeToken(refreshToken)
            return { ok: true }
        } catch (error) {
            console.log(error)
            new ForbidenException({ auth: errorsExist ? errors.auth.isNotAuth.auth : 'User is not authorized' })
        }
    }

    async refreshToken({ refreshToken }: RefreshTokenInput, errors?: any): Promise<RefreshTokenOutput> {
        const errorsExist: boolean = JSON.stringify(errors) !== '{}'

        if (!refreshToken)
            throw new ForbidenException({ auth: errorsExist ? errors.auth.isNotAuth.auth : 'User is not authorized' })

        // Check refresh token in db and validate it
        const userData = await this.jwt.validateRefreshToken(refreshToken)
        const tokenFromDb = await this.jwt.findToken(refreshToken)
        if (!userData || !tokenFromDb)
            throw new ForbidenException({ auth: errorsExist ? errors.auth.isNotAuth.auth : 'User is not authorized' })

        try {
            const user = await this.users.findOne({ where: { id: userData.id } })
            const tokens = this.jwt.generateTokens({ id: user.id })
            await this.jwt.saveToken(user.id, tokens)

            return { ok: true, ...tokens, user }
        } catch (error) {
            console.log(error)
            new ForbidenException({ auth: errorsExist ? errors.auth.isNotAuth.auth : 'User is not authorized' })
        }
    }
}
