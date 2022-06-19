import { EmailMessage } from './dtos/message.dto'
import { Injectable } from '@nestjs/common'
import * as sgMail from '@sendgrid/mail'
import { VerificationEmailMessage } from './emails/verification.email'

@Injectable()
export class EmailService {
    private sgMail
    constructor() {
        this.sgMail = sgMail.setApiKey(process.env.SENDGRID_API_KEY)
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
        return this.sendMail(VerificationEmailMessage(to, fullname, code))
    }
}
