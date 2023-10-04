import { User } from '../entities'

/**
 * Get User from context headers
 * @param context any
 * @returns User object
 */
export const getCurrentUser = (context: any): User => {
    let currentUser: User
    // If user
    if (context && context.req && context.req.user && context.req.user.roles) {
        currentUser = context.req.user
        return currentUser
    }
    // If recovery user
    if (context && context.req && context.req['recovery_user']) {
        currentUser = context.req['recovery_user']
        return currentUser
    }
    return currentUser
}
