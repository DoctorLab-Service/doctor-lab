import { Role } from 'src/roles/entities'
import { Repository } from 'typeorm'

export type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

export interface UserStub extends User {
    id?: number
    fullname?: string
    phone?: string
    email?: string
    password?: string
    verifiedPhone?: boolean
    verifiedEmail?: boolean
    avatar?: string
    birthdate?: Date
    country?: string
    state?: string
    address?: string
    experience?: string
    facebookId?: string
    googleId?: string
    language?: ELanguage
    gender?: EGender
    roles?: UserRoles[]
    createdRoles?: Role[]
    setRoles?: UserRoles[]
    helpMessage?: HelpMessage[]
    resetKey?: EResetKey
}
