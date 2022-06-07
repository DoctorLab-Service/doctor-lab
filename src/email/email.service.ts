import { VerifyEmail } from './../users/entities/verify-email.entity'
import { EmailMessage } from './dtos/message.dto'
import { Injectable } from '@nestjs/common'
import * as sgMail from '@sendgrid/mail'
import { VerificationEmail } from './emails/verification.email'
import { ValidationException } from 'src/exceptions/validation.exception'
import { NotifiesService } from 'src/notifies/notifies.service'
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class EmailService {
    private sgMail
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerifyEmail) private readonly verification: Repository<VerifyEmail>,
        private notifiesService: NotifiesService,
    ) {
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
        return this.sendMail(VerificationEmail(to, fullname, code))
    }

    /**
     * Verification phone by code
     */
    async verificationEmail({ code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
        this.notifiesService.init('RU', 'verify')
        const errorsVerify = await this.notifiesService.notify('error', 'isNotVeify')
        try {
            const verification = await this.verification.findOne({
                where: { code },
                relations: ['user'],
            })

            if (!verification) throw new ValidationException({ error: errorsVerify.email })

            verification.user.verifiedEmail = true
            await this.users.save(verification.user)
            await this.verification.delete(verification.id)

            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ email: errorsVerify.email })
        }
    }
}
