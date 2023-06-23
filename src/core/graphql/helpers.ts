import { localStorageKey } from "core"

/**
 * Get GraphQL Errors
 */
export const getGraphQLErrors = err => {
    const errors = err
        && err.graphQLErrors
        && err.graphQLErrors[0]
        && err.graphQLErrors[0].extensions
        && err.graphQLErrors[0].extensions.exception
        && err.graphQLErrors[0].extensions.exception['response']
    return !errors ? err : errors
}

/** 
 *  Get tokent form localstorage
 */
export const getToken = (): string | null => {
    // Get item from  localstorage
    const token = localStorage.getItem(localStorageKey.token)
    if (!token) return null
    return token
}
/** 
 *  Get Language form localstorage
 */
export const getLanguage = (): string | null => {
    // Get item from  localstorage
    const language = localStorage.getItem(localStorageKey.language)
    if (!language) return 'EN'
    return language
}
