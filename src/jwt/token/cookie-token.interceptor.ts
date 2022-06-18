import { GqlExecutionContext } from '@nestjs/graphql'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { CookieOptions } from 'express'

const cookieOptions: CookieOptions = {
    domain: 'localhost', // <- Change to your client domain
    secure: process.env.NODE_ENV === 'production', // <- Should be true if !development
    // sameSite: 'strict',
    httpOnly: true,
    path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
}

@Injectable()
export class AccessTokenCookieInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = GqlExecutionContext.create(context).getContext()
        return next.handle().pipe(
            tap(({ refreshToken }) => {
                ctx.res.cookie('refreshToken', refreshToken.toString(), cookieOptions)
            }),
        )
    }
}
