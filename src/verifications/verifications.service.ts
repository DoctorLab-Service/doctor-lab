import { relationsConfig } from 'src/common/configs/'
import { Injectable } from '@nestjs/common'
import { ValidationException } from 'src/exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { VerificationEmail } from 'src/verifications/entities/verification-email.entiry'
import { VerificationEmailInput, VerificationEmailOutput } from './dtos/verification-email.dto'
import { VerificationPhoneInput, VerificationPhoneOutput } from './dtos/verification-phone.dto'
import { VerificationPhone } from './entities/verification-phone.entiry'
import { LanguageService } from 'src/language/language.service'
import { Messages } from 'src/language/dtos/notify.dto'

@Injectable()
export class VerificationsService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerificationEmail) private readonly verifyEmail: Repository<VerificationEmail>,
        @InjectRepository(VerificationPhone) private readonly verifyPhone: Repository<VerificationPhone>,
        private readonly languageService: LanguageService,
    ) {}

    /**
     * Verification phone by code
     */
    async verificationEmail({ code }: VerificationEmailInput): Promise<VerificationEmailOutput> {
        const verification = await this.verifyEmail.findOne({ where: { code }, ...relationsConfig.verifications })

        if (!verification)
            throw new ValidationException({ error: await this.languageService.setError(['isNotVerify', 'email']) })

        try {
            verification.user.verifiedEmail = true
            await this.users.save(verification.user)
            await this.verifyEmail.delete(verification.id)

            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                email: await this.languageService.setError(['isNotVerify', 'email']),
            })
        }
    }

    /**
     * Verification phone by code
     */
    async verificationPhone({ code }: VerificationPhoneInput): Promise<VerificationPhoneOutput> {
        const verification = await this.verifyPhone.findOne({ where: { code }, ...relationsConfig.verifications })

        if (!verification)
            throw new ValidationException({ phone: await this.languageService.setError(['isNotVerify', 'phone']) })

        try {
            verification.user.verifiedPhone = true
            await this.users.save(verification.user)
            await this.verifyPhone.delete(verification.id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ phone: await this.languageService.setError(['isNotVerify', 'phone']) })
        }
    }
}
