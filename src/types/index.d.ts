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
// COMPONENTS
export interface SocialResponseData {
    provider?: string
    facebookId?: string
    googleId?: string
    email: string
    fullname: string
}

// HOOKS
export interface UseAuth {
    redirectToApp: any
    logout: () => void
    removeToken: () => void
    readonly isAuth: boolean
    setToken: (token: string) => void
    authentication: (token: string) => void
}

export interface MutationsValue {
    mutation: any
    loading: boolean
}
export interface MutationsRequest {
    [key: string]: MutationsValue
}
export interface Mutations {
    mutations: {
        [key: string]: MutationsValue
    }
    setErrors: (errors: any) => void
}

export interface UseForm {
    validate: any,
    mutations: Mutations
    emptyForm: boolean
    onBlur: (e: any) => void,
    form: Record<string, any>,
    onFocus: (e: any) => void,
    onChange: (e: any) => void,
    resetForm: (e?: any) => void,
    onSubmit: (e: any, request?: any) => void,
    setForm: Dispatch<SetStateAction<Record<string, any>>>
}

export interface UseRoles {
    roles: RolesList[]
    currentRoleId: number
    pathWithRole: string
    currentRole: CurrentRole
    changeRole: (idx: number) => void
}

export interface Page {
    pagename: FormType
    isLogin: boolean
    isRegister: boolean
    isForgot: boolean
    isSupport: boolean
    isVerification: boolean
    isChangePassword: boolean
    isRecoveryPassword: boolean
}
export interface UsePaths {
    page: Page
    paths: any
    search: string
    pathname: string
    hostname: string
    navigate: NavigateFunction
    state: ISetStateActionPayload
    setState: (obj: ISetStateActionPayload) => any
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
    validationInput: (e: any) => void
    setValidate: Dispatch<SetStateAction<Record<string, any>>>
} 
