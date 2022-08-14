import { LanguageService } from 'src/language/language.service'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ForbiddenException } from 'src/exceptions'
import { UsersService } from 'src/users/users.service'
import { JWT_TOKEN } from '../jwt.config'
import { JwtService } from '../jwt.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly languageService: LanguageService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        if (JWT_TOKEN in req.headers) {
            const accessToken = req.headers[JWT_TOKEN]
            try {
                const decoded = await this.jwtService.validateAccessToken(accessToken.toString())
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    const user = await this.usersService.findById({ id: decoded.id })
                    req['user'] = user.user
                }
            } catch (error) {
                console.log(error.message)
                if (error.message === 'jwt expired') {
                    await this.jwtService.removeExpiredAccessToken(accessToken.toString())
                    next(
                        new ForbiddenException({
                            token_expired: await this.languageService.setError(['token', 'expired'], 'auth'),
                        }),
                    )
                }
                next(
                    new ForbiddenException({
                        auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                    }),
                )
            }
        }
        next()
    }
}
