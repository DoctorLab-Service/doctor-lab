import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { ForbidenException } from 'src/exceptions/forbiden.exception'
import { JwtService } from './jwt.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    async use(req: any, res: any, next: NextFunction) {
        if ('x-jwt' in req.headers) {
            const accessToken = req.headers['x-jwt']
            try {
                const user = this.jwtService.validateAccessToken(accessToken.toString())
                if (!user) throw new ForbidenException({})

                req['user'] = user
                next()
            } catch (error) {
                console.log(error.message)
                throw new ForbidenException({ error: 'Пользователь не авторизован' })
            }
        }
    }
}
