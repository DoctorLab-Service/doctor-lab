import * as jwt from 'jsonwebtoken'
import { GqlExecutionContext } from '@nestjs/graphql'
import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { TokenService } from 'src/token/token.service'
import { LanguageService } from 'src/language/language.service'
import { tokenKey } from 'src/token/config/token.enums'
import { User } from '../entities'
import { UsersService } from '../users.service'

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly languageService: LanguageService,
    ) {}
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const ctxGql = GqlExecutionContext.create(context)
        const ctx = ctxGql.getContext()
        const body = ctxGql.getArgs()
        let user: User | null

        const decodedToken = async (headers): Promise<User | null> => {
            let key: 'recoveryToken' | 'accessToken'
            if (tokenKey.JWT in headers) {
                key = 'accessToken'
            }
            if (tokenKey.RECOVERY_JWT in headers) {
                key = 'recoveryToken'
            }
            const token = headers[tokenKey[key === 'accessToken' ? 'JWT' : 'RECOVERY_JWT']]
            if (!token) {
                throw new ForbiddenException({
                    auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                })
            }
            const candidate = await this.tokenService.findToken(key, token)
            if (!candidate) {
                throw new Error()
            }

            const decoded = await this.tokenService.validateToken(key, token.toString())
            if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                const user = await this.usersService.findById({ id: decoded.id })
                return user.user
            }
        }

        if (ctx) {
            let headers = ctx.headers
            if (headers === undefined) {
                headers = ctx.req.headers
            }

            user = await decodedToken(headers)
            if (!user) {
                throw new ForbiddenException({
                    auth: await this.languageService.setError(['isNotAuth', 'auth'], 'auth'),
                })
            }
        }

        body && body.input ? (body.input.currentUser = user) : (body.currentUser = user)
        return next.handle()
    }
}
