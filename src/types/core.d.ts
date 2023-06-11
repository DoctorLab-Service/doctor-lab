export type FormType = 'login' | 'register' | 'forgot' | 'support' | 'verification' | 'changePassword'
export type InputAutoComplete = 'on' | 'off'
export type InputStatus = 'success' | 'error' | undefined
export type ButtonType = 'button' | 'submit' | 'reset' | 'link'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonVariant = 'primary' | 'secondary' | 'default' | 'disabled' | 'warning' | 'none'
export type Roles = 'doctor' | 'dentist'  | 'patient' | 'admin'

export interface DefaultProps {
    darkMode: boolean
    toggleTheme: () => void
}

export interface statusimage {
    success: ReactNode
    error: ReactNode
}