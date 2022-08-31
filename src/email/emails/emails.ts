import { CustomMailParams } from '../types'
import {
    changeEmailInfoParams,
    changeEmailParams,
    passwordRecoveryParams,
    verificationEmailParams,
} from './emails.config'
import { defaultEmailMessage } from './messages/default-email'
import { infoEmailMessage } from './messages/info-email'

/**
 * Email message to verify
 * @param params { fullname: string | link: string }
 * @returns string
 */
export const verificationEmailMessage = (params: CustomMailParams): string => {
    return defaultEmailMessage(verificationEmailParams, params)
}

/**
 * Email message to info
 * @param params { link: string }
 * @returns string
 */
export const changeInfoMessage = (params: CustomMailParams, button: string): string => {
    changeEmailInfoParams.button = button
    return infoEmailMessage(changeEmailInfoParams, params)
}

/**
 * Email message to forgot password
 * @param params { link: string }
 * @returns string
 */
export const passwordRecoveryMessage = (params: CustomMailParams): string => {
    return defaultEmailMessage(passwordRecoveryParams, params)
}

/**
 * Email message to forgot password
 * @param params { link: string }
 * @returns string
 */
export const changeEmailMessage = (params: CustomMailParams): string => {
    return defaultEmailMessage(changeEmailParams, params)
}
