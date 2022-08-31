import { GqlExecutionContext } from '@nestjs/graphql'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { tokenKey } from '../config/token.enums'

@Injectable()
export class ClearTokenCookieInterceptor implements NestInterceptor {
    private tokenKey: tokenKey

    constructor(key?: tokenKey) {
        this.tokenKey = key ? key : tokenKey.REFRESH
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = GqlExecutionContext.create(context).getContext()

        return next.handle().pipe(tap(() => ctx.res.clearCookie(this.tokenKey)))
    }
}
