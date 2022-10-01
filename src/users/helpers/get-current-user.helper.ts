import { User } from '../entities'

/**
 * Get User from context headers
 * @param context any
 * @returns User object
 */
export const getCurrentUser = (context: any): User => {
    let currentUser: User
    if (context && context.req.user.roles) {
        currentUser = context.req.user
    }
    return currentUser
}
