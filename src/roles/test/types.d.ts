export interface RolesStubParams {
    user?: boolean
    role?: boolean
    roles?: boolean
    roleKey?: string
    roleType?: 'custom' | 'system'
}

export interface RolesStub {
    id: number
    role: string
    roleKey: string
    description: string
    type: ERolesType
    user: number | null
}
