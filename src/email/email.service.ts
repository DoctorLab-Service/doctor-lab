import { EmailMessage } from './dtos/message.dto'
import { Inject, Injectable } from '@nestjs/common'
import * as sgMail from '@sendgrid/mail'
import { VerificationEmailMessage } from './emails/verification.email'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { EMailModuleOptions } from './dtos/mail.dtos'

@Injectable()
export class EmailService {
    private sgMail
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: EMailModuleOptions) {
        this.sgMail = sgMail.setApiKey(this.options.apiKey)
    }

    async sendMail(msg: EmailMessage): Promise<boolean> {
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
     */
    async sendVerificationEmail(to: string, fullname: string, code: string): Promise<boolean> {
        const confirmLink = `${process.env.SERVER_HOST + process.env.SERVER_PORT}/confirm?${code}`
        return this.sendMail({
            to,
            from: this.options.fromEmail,
            subject: 'Verification Email',
            html: VerificationEmailMessage(fullname, confirmLink),
        })
        // return this.sendMail(VerificationEmailMessage(to, fullname, code))
    }
}
