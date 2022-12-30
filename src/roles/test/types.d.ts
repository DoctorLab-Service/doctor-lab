export interface RolesStubParams {
    user?: boolean
    role?: boolean
    roles?: boolean
    roleKey?: string
    roleType?: 'custom' | 'system'
}

export type RolesStub = Role
export type UserRolesStub = UserRoles
