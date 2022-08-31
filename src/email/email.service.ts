import { Inject, Injectable } from '@nestjs/common'
import * as sgMail from '@sendgrid/mail'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import {
    verificationEmailMessage,
    passwordRecoveryMessage,
    changeEmailMessage,
    changeInfoMessage,
} from './emails/emails'
import { MailMessage, MailModuleOptions } from './types'

@Injectable()
export class EmailService {
    private sgMail
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions) {
        this.sgMail = sgMail.setApiKey(this.options.apiKey)
    }

    async sendMail(msg: MailMessage): Promise<boolean> {
        try {
            await this.sgMail.send(msg)
            return true
        } catch (error) {
            console.error(error)
            if (error.response) {
                console.error(error.response.body)
            }
            return false
        }
    }

    /**
     * Send verification email
     * @param to recipient email address
     * @param fullname recipient user name
     * @param code code
     */
    async sendVerificationEmail(to: string, fullname: string, code: string): Promise<boolean> {
        const link = `${process.env.SERVER_HOST + process.env.SERVER_PORT}/confirm?${code}`
        return this.sendMail({
            to,
            from: this.options.fromEmail,
            subject: 'Verification Email',
            html: verificationEmailMessage({ fullname, link }),
        })
    }

    /**
     * Send forgot email, for reset password
     * @param to recipient email address
     * @param fullname recipient user name
     * @param code code
     */
    async sendPasswordRecovery(to: string, code: string): Promise<boolean> {
        const link = `${process.env.SERVER_HOST + process.env.SERVER_PORT}/forgot-password?${code}`
        return this.sendMail({
            to,
            from: this.options.fromEmail,
            subject: 'Recovery password: forgot',
            html: passwordRecoveryMessage({ link }),
        })
    }

    /**
     * Send forgot email, for reset password
     * @param to recipient email address
     * @param fullname recipient user name
     * @param code code
     */
    async sendChangeEmail(to: string, fullname: string, code: string): Promise<boolean> {
        const link = `${process.env.SERVER_HOST + process.env.SERVER_PORT}/change-email?${code}`
        return this.sendMail({
            to,
            from: this.options.fromEmail,
            subject: 'Change Email',
            html: changeEmailMessage({ fullname, link }),
        })
    }

    /**
     * Send forgot email, for reset password
     * @param to recipient email address
     * @param fullname recipient user name
     * @param code code
     */
    async sendChangeInfo(to: string, fullname: string, changedData: string): Promise<boolean> {
        return this.sendMail({
            to,
            from: this.options.fromEmail,
            subject: 'Change Email - Complited',
            html: changeInfoMessage({ fullname }, changedData),
        })
    }
}
