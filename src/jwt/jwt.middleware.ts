import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ForbiddenException } from 'src/exceptions'
import { defaultErrors } from 'src/language/notifies/default.errors'
import { UsersService } from 'src/users/users.service'
import { JWT_TOKEN } from './jwt.config'
import { JwtService } from './jwt.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        if (JWT_TOKEN in req.headers) {
            const accessToken = req.headers[JWT_TOKEN]
            try {
                const decoded = await this.jwtService.validateAccessToken(accessToken.toString())
                if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                    const user = await this.usersService.findById({ id: decoded.id })
                    req['user'] = user
                }
            } catch (error) {
                console.log(error.message)
                if (error.message === 'jwt expired') {
                    await this.jwtService.removeExpiredAccessToken(accessToken.toString())
                    next(new ForbiddenException({ error: defaultErrors.tokenExpired }))
                }
                next(new ForbiddenException({ error: defaultErrors.auth }))
            }
        }
        next()
    }
}
