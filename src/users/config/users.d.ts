export interface SystemUserParams {
    email: string
    phone: string
    fullname: string
    address?: string
    experience?: string
    password: string
    verifiedEmail: boolean
    verifiedPhone: boolean
    language?: ELanguage.RU
}
