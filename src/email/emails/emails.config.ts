import { DefaultMailParams } from '../types'

export const verificationEmailParams: DefaultMailParams = {
    path: '',
    title: 'Confirm email',
    emailTitle: 'Confirm your email',
    button: 'Verification Email',
}

export const passwordRecoveryParams: DefaultMailParams = {
    path: '',
    title: 'Password Recovery - Forgot',
    emailTitle: 'Did you forgot password?',
    button: 'Change Password',
}

export const changeEmailParams: DefaultMailParams = {
    path: '',
    title: 'Change Email',
    emailTitle: 'Did you want change email?',
    button: 'Change Email',
}

export const changeEmailInfoParams = (data: string, name: string): DefaultMailParams => ({
    path: '',
    title: `Change ${name} - Complited`,
    emailTitle: `Your ${name} has been changed`,
    content: `Your ${name} has been changed to: `,
    button: data,
})

export const helpMessageEmailParams: DefaultMailParams = {
    path: '',
    title: 'Help Message',
}
