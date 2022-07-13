import { GqlExecutionContext } from '@nestjs/graphql'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { REFRESH_TOKEN } from '../jwt.config'

@Injectable()
export class ClearTokenCookieInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const ctx = GqlExecutionContext.create(context).getContext()

        return next.handle().pipe(tap(() => ctx.res.clearCookie(REFRESH_TOKEN)))
    }
}
