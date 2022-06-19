import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ForbidenException } from 'src/exceptions/forbiden.exception'
import { UsersService } from 'src/users/users.service'
import { JwtService } from './jwt.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        if ('x-jwt' in req.headers) {
            const accessToken = req.headers['x-jwt']
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
                    next(new ForbidenException({ error: 'Срок действия токена истек' }))
                }
                next(new ForbidenException({ error: 'Пользователь не авторизован' }))
            }
        }
        next()
    }
}
