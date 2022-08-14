import { Injectable } from '@nestjs/common'
import { ChangeEmailInput, ChangePhoneInput, ChangePasswordInput, ChangeOutput } from './dtos/change.dto'
import {
    ConfirmPasswordInput,
    ConfirmOutput,
    ConfirmCodeOutput,
    ConfirmPhoneCodeInput,
    ConfirmEmailCodeInput,
} from './dtos/confirm.dto'
import { ResetOutput } from './dtos/reset.dto'

@Injectable()
export class ResetService {
    /**
     * Reset email, and send verify email
     * @returns true or error
     */
    async resetEmail(): Promise<ResetOutput> {
        // TODO Send email with link
        return { ok: true }
    }

    /**
     * Chenge user email and send info on email
     * @param body new email and  reEmail
     * @returns true if complited or error
     */
    async changeEmail(body: ChangeEmailInput): Promise<ChangeOutput> {
        // TODO Change email
        // TODO Send email with new email

        return { ok: true }
    }

    /**
     * Send on new phone code
     * @param body new phone
     * @returns true if complited or error
     */
    async changePhone(body: ChangePhoneInput): Promise<ChangeOutput> {
        // TODO Send sms code
        // TODO Change phone
        // TODO Send email with info about change phone

        return { ok: true }
    }

    /**
     * Reset password, and  send  verify email
     * @returns true or error
     */
    async resetPassword(): Promise<ResetOutput> {
        // TODO Send email with link

        return { ok: true }
    }

    /**
     * Change password
     * @param body new password and rePasswor
     * @returns true if complited or error
     */
    async changePassword(body: ChangePasswordInput): Promise<ChangeOutput> {
        // TODO change password
        // TODO send email with info about change password

        return { ok: true }
    }

    /**
     * Confirm reset code, send sms code
     * @param body phone number
     * @returns code
     */
    async confirmPhoneCode({ phone }: ConfirmPhoneCodeInput): Promise<ConfirmCodeOutput> {
        // TODO generate code and send to sms
        // TODO add to database

        return { ok: true, code: null }
    }
    /**
     * Confirm reset code, send email link
     * @param body email
     * @returns code
     */
    async confirmEmailCode({ email }: ConfirmEmailCodeInput): Promise<ConfirmCodeOutput> {
        // TODO generate code and send to email link
        // TODO add to database

        return { ok: true, code: null }
    }

    /**
     * Create new password and send to email or sms
     * @param body phone or email
     * @returns true or error
     */
    async confirmPassword(body: ConfirmPasswordInput): Promise<ConfirmOutput> {
        // TODO comparison body.code  with code from database
        // TODO Change password
        // TODO Send email or sms with new password

        return { ok: true }
    }
}
