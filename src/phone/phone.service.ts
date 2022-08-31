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
     * Send verification sms with code
     * @param to recipient phone address
     * @param code code
     * @returns boolean true if successful, false if not send
     */
    async sendVerificationSMS(to: string, code: string): Promise<boolean> {
        return this.sendSMS(to, `Your verification code is: ${code}`)
    }

    /**
     * Send recovery sms with code
     * @param to recipient phone address
     * @param code code
     * @returns boolean true if successful, false if not send
     */
    async sendPasswordRecoverySMS(to: string, code: string): Promise<boolean> {
        return this.sendSMS(to, `Your password recovery code is: ${code}`)
    }

    /**
     * Send sms with code for change password
     * @param to recipient phone address
     * @param code code
     * @returns boolean true if successful, false if not send
     */
    async sendChangePasswordSMS(to: string, code: string): Promise<boolean> {
        return this.sendSMS(to, `Your code for change password is: ${code}`)
    }
}
