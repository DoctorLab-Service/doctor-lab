import { Reflector } from '@nestjs/core'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ROLES_KEY } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Get all required roles
        const mainRole = this.reflector.get<string[]>(ROLES_KEY, context.getClass()) || []
        const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) || []

        // Get current user from Context
        const gqlContext = GqlExecutionContext.create(context).getContext()
        if (gqlContext.req && gqlContext.req.user) {
            // Get current user
            const currentUser = gqlContext.req.user
            if (!currentUser.roles.length) return false

            // Check to mainRoles by exists
            if (mainRole.length) {
                const mainUserRoles = []
                mainRole.forEach(mRole => {
                    currentUser.roles.filter(cRole => {
                        if (cRole.role.roleKey === mRole) {
                            mainUserRoles.push(cRole.role)
                        }
                    })
                })

                if (mainUserRoles.length) {
                    // Check required toles by  exists if exist main role
                    if (requiredRoles.length) {
                        const requiredUserRoles = []
                        requiredRoles.forEach(rRole => {
                            currentUser.roles.filter(cRole => {
                                if (cRole.role.roleKey === rRole) {
                                    requiredUserRoles.push(cRole.role)
                                }
                            })
                        })

                        if (requiredUserRoles.length) return true
                        return false
                    }

                    return true
                }

                return false
            }

            // Check required roles if not main roles by  exists
            if (requiredRoles.length) {
                const requiredUserRoles = []
                requiredRoles.forEach(rRole => {
                    currentUser.roles.filter(cRole => {
                        if (cRole.role.roleKey === rRole) {
                            requiredUserRoles.push(cRole.role)
                        }
                    })
                })

                if (requiredUserRoles.length) return true
                return false
            }
            return false
        }

        return false
    }
}
