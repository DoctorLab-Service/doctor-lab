import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
    // Guard for checking authorization by context.
    // if user into the req, then return treu if not exist to return  false
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const gqlContext = GqlExecutionContext.create(context).getContext()
        const user = gqlContext['user']

        if (!user) return false
        return true
    }
}
