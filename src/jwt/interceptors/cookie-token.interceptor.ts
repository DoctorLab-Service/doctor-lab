import { GqlExecutionContext } from '@nestjs/graphql'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { cookieOptions, REFRESH_TOKEN } from '../jwt.config'

@Injectable()
export class AccessTokenCookieInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = GqlExecutionContext.create(context).getContext()
        return next.handle().pipe(
            tap(({ refreshToken }) => {
                ctx.res.cookie(REFRESH_TOKEN, refreshToken.toString(), cookieOptions)
            }),
        )
    }
}
