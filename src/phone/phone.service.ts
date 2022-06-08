import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ValidationException } from 'src/exceptions/validation.exception'
import { NotifiesService } from 'src/notifies/notifies.service'
import { User } from 'src/users/entities/user.entity'
import { VerifyPhone } from 'src/users/entities/verify-phone.entity'
import * as Twilio from 'twilio'
import { Repository } from 'typeorm'
import { VerifyPhoneInput, VerifyPhoneOutput } from './dtos/verify-phone.dto'

@Injectable()
export class PhoneService {
    private twilioSMS
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerifyPhone) private readonly verification: Repository<VerifyPhone>,
        private notifiesService: NotifiesService,
    ) {
        this.twilioSMS = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
    }

    async sendSMS(to: string, body: string): Promise<boolean> {
        try {
            await this.twilioSMS.messages.create({ body, to, from: process.env.TWILIO_PHONE })
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
     *  Send verification sms with code
     */
    async sendVerificationSMS(to: string, code: string): Promise<boolean> {
        return this.sendSMS(to, `Your verification key is: ${code}`)
    }

    /**
     * Verification phone by code
     */
    async verificationPhone({ code }: VerifyPhoneInput): Promise<VerifyPhoneOutput> {
        this.notifiesService.init('RU', 'verify')
        const errorsVerify = await this.notifiesService.notify('error', 'isNotVeify')
        try {
            const verification = await this.verification.findOne({
                where: { code },
                relations: ['user'],
            })

            if (!verification) throw new ValidationException({ error: errorsVerify.phone })

            verification.user.verifiedPhone = true
            await this.users.save(verification.user)
            await this.verification.delete(verification.id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ phone: errorsVerify.phone })
        }
    }
}
