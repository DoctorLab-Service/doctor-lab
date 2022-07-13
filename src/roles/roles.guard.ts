import { Reflector } from '@nestjs/core'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (!requiredRoles) {
            return false
        }

        const gqlContext = GqlExecutionContext.create(context).getContext()
        if (gqlContext.req && gqlContext.req.user) {
            const { roles } = gqlContext.req.user.user
            // if (!roles.length) return false
            const success = roles.map(role => {
                requiredRoles.filter(rRole => console.log(rRole, role))
            })
        }
        return true
        // return matchRoles(roles, user.roles)
    }
}
