import { Injectable } from '@nestjs/common'
import * as Twilio from 'twilio'

@Injectable()
export class PhoneService {
    private twilioSMS
    constructor() {
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
}
