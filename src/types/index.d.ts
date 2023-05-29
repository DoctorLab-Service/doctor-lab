export type SocialProviders = 'facebook' | 'google'

export interface SVGProps {
    className?: string
}

export interface RolesList {
    key: Roles
    value: string
    src: string
    changed: boolean
}

// HOOKS
export interface UseFormResponse {
    onChange: (e: any) => void,
    onSubmit: (e: any) => void,
    onFocus: (e: any) => void,
    onBlur: (e: any) => void,
    validate: any,
    form: Record<string, any>,
    emptyForm: boolean
}

export interface UseRoles {
    roles: RolesList[]
    currentRole: Roles
    currentRoleId: number
    changeRole: (idx: number) => void
}

export interface UsePathname {
    pathname: string
    pagename: FormType
}