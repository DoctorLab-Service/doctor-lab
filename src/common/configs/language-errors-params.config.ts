import { LanguageErrorsParams } from './types'

export const languageErrorsParams: LanguageErrorsParams = {
    auth: ['users', 'auth'],
    roles: ['users', 'auth', 'roles'],
    users: ['users', 'auth', 'verify'],
    verifications: ['verify'],
}
