export type { RootState, AppDispatch } from './types'

export { store } from './store'
export { useAppDispatch, useAppSelector } from './hooks'

// Store Actions
export { 
    setForm,
    setState,
    setValidate,
    setConfirmEmail,
    checkRecoveryPassword,
    checkIsChangePasswordForm,
} from './slices/form.slice'
