import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
    // Guard for checking authorization by context.
    // if user into the req, then return treu if not exist to return  false
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const gqlContext = GqlExecutionContext.create(context).getContext()
        const user = gqlContext.req['user']
        if (!user) return false
        if (!user.verifiedPhone) {
            // ? Info if dont verified user
            console.log('=============================================')
            console.log()
            console.log()
            console.log('[ AUTH ]')
            console.log('User is not verified phone')
            console.log()
            console.log()
            console.log('=============================================')
            return false
        }
        return true
    }
}
