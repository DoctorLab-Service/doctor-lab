import { Inject, Injectable } from '@nestjs/common'
import * as sgMail from '@sendgrid/mail'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import {
    verificationEmailMessage,
    passwordRecoveryMessage,
    changeEmailMessage,
    changeInfoMessage,
    helpEmailMessage,
} from './emails/emails'
import { EmailParams, MailMessage, MailModuleOptions } from './types'

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
    async sendVerificationEmail({ to, fullname, code }: EmailParams): Promise<boolean> {
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
    async sendPasswordRecovery({ to, code }: EmailParams): Promise<boolean> {
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
    async sendChangeEmail({ to, fullname, code }: EmailParams): Promise<boolean> {
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
     * @param changeName name to change email | password | phone
     * @param to recipient email address
     * @param fullname recipient user name
     * @param code code
     */
    async sendChangeInfo(changeName: string, { to, fullname, changedData }: EmailParams): Promise<boolean> {
        return this.sendMail({
            to,
            from: this.options.fromEmail,
            subject: `Change ${changeName} - Complited`,
            html: changeInfoMessage({ fullname }, changedData),
        })
    }

    /**
     * Send forgot email, for reset password
     * @param to recipient email address
     * @param fullname recipient user name
     * @param subject subject message
     * @param text text message
     */
    async sendHelpMassageEmail({ to, fullname, subject, text }: EmailParams): Promise<boolean> {
        return this.sendMail({
            to: to ? to : this.options.suportEmail, //send to suport email,
            from: this.options.fromEmail,
            subject: `Help Message - ${subject}`,
            html: helpEmailMessage({ fullname, subject, text }),
        })
    }
}
