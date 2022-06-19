import { Injectable } from '@nestjs/common'
import { ValidationException } from 'src/exceptions/validation.exception'
import { NotifiesService } from 'src/notifies/notifies.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { VerificationEmail } from 'src/verifications/entities/verification-email.entiry'
import { VerificationEmailInput, VerificationEmailOutput } from './dtos/verification-email.dto'
import { VerificationPhoneInput, VerificationPhoneOutput } from './dtos/verification-phone.dto'
import { VerificationPhone } from './entities/verification-phone.entiry'

@Injectable()
export class VerificationsService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerificationEmail) private readonly verifyEmail: Repository<VerificationEmail>,
        @InjectRepository(VerificationPhone) private readonly verifyPhone: Repository<VerificationPhone>,
        private notifiesService: NotifiesService,
    ) {}

    /**
     * Verification phone by code
     */
    async verificationEmail({ code }: VerificationEmailInput): Promise<VerificationEmailOutput> {
        this.notifiesService.init('RU', 'verify')
        const errorsVerify = await this.notifiesService.notify('error', 'isNotVeify')
        try {
            const verification = await this.verifyEmail.findOne({
                where: { code },
                relations: ['user'],
            })

            if (!verification) throw new ValidationException({ error: errorsVerify.email })

            verification.user.verifiedEmail = true
            await this.users.save(verification.user)
            await this.verifyEmail.delete(verification.id)

            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ email: errorsVerify.email })
        }
    }

    /**
     * Verification phone by code
     */
    async verificationPhone({ code }: VerificationPhoneInput): Promise<VerificationPhoneOutput> {
        this.notifiesService.init('RU', 'verify')
        const errorsVerify = await this.notifiesService.notify('error', 'isNotVeify')
        try {
            const verification = await this.verifyPhone.findOne({
                where: { code },
                relations: ['user'],
            })

            if (!verification) throw new ValidationException({ error: errorsVerify.phone })

            verification.user.verifiedPhone = true
            await this.users.save(verification.user)
            await this.verifyPhone.delete(verification.id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ phone: errorsVerify.phone })
        }
    }
}
