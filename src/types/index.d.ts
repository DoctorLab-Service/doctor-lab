
export type SocialProviders = 'facebook' | 'google'

export type Paths = {
    [key: string]: any
}

export interface Form {
    [key: string]: any
}

export interface Validate {
    [key: string]: any
}

export interface SVGProps {
    className?: string
}

export interface RolesList {
    key: Roles
    src: string
    value: string
    changed: boolean
}

export interface CurrentRole {
    key: Roles
    value: string
}

// HOOKS
export interface UseForm {
    validate: any,
    emptyForm: boolean
    onBlur: (e: any) => void,
    form: Record<string, any>,
    onFocus: (e: any) => void,
    onSubmit: (e: any) => void,
    onChange: (e: any) => void,
    clearValidate: () => void
    setForm: Dispatch<SetStateAction<Record<string, any>>>
    setValidate: Dispatch<SetStateAction<Record<string, any>>>,
}

export interface UseRoles {
    roles: RolesList[]
    currentRoleId: number
    currentRole: CurrentRole
    changeRole: (idx: number) => void
}

export interface UsePaths {
    state: any
    paths: any
    pathname: string
    hostname: string
    pagename: FormType
    navigate: NavigateFunction
}

export interface UseLanguage {
    value: string
    currentLanguage: string
    languages: LanguagesOptions[]
    changeLanguage: (e: any) => void
    setCurrentLanguage: Dispatch<SetStateAction<string>>
    setLanguages: Dispatch<SetStateAction<LanguagesOptions[]>>
}

export interface UseValidation {
    validate: Validate
    isEmpty: (form: any) => boolean
    isIPv4: (value: string) => boolean
    isIPv6: (value: string) => boolean
    isEmail: (value: string) => boolean
    isPhone: (value: string) => boolean
    isNumber: (value: string) => boolean
    isPassword: (value: string) => boolean
    isOnlyNumber: (value: string) => boolean
    validationInput: (e: any, form: Form) => void
    setForm: Dispatch<SetStateAction<Record<string, Form>>>
    setValidate: Dispatch<SetStateAction<Record<string, any>>>
} 
