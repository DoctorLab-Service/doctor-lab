import { Injectable } from '@nestjs/common'
import { ValidationException } from 'src/exceptions/validation.exception'
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
    private errors: Messages | Record<string, any>
    private errorsExist: boolean
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(VerificationEmail) private readonly verifyEmail: Repository<VerificationEmail>,
        @InjectRepository(VerificationPhone) private readonly verifyPhone: Repository<VerificationPhone>,
        private readonly languageService: LanguageService,
    ) {
        this.languageService.errors(['verify']).then(errors => {
            this.errors = errors
            this.errorsExist = JSON.stringify(errors) !== '{}'
        })
    }

    /**
     * Verification phone by code
     */
    async verificationEmail({ code }: VerificationEmailInput): Promise<VerificationEmailOutput> {
        const verification = await this.verifyEmail.findOne({
            where: { code },
            relations: ['user'],
        })

        if (!verification)
            throw new ValidationException({
                error: this.errorsExist ? this.errors.verify.isNotVeify.email : 'Not a valid verification link',
            })

        try {
            verification.user.verifiedEmail = true
            await this.users.save(verification.user)
            await this.verifyEmail.delete(verification.id)

            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                email: this.errorsExist ? this.errors.verify.isNotVeify.email : 'Not a valid verification link',
            })
        }
    }

    /**
     * Verification phone by code
     */
    async verificationPhone({ code }: VerificationPhoneInput): Promise<VerificationPhoneOutput> {
        const verification = await this.verifyPhone.findOne({
            where: { code },
            relations: ['user'],
        })

        if (!verification)
            throw new ValidationException({
                phone: this.errorsExist ? this.errors.verify.isNotVerify.phone : 'Invalid code',
            })

        try {
            verification.user.verifiedPhone = true
            await this.users.save(verification.user)
            await this.verifyPhone.delete(verification.id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                phone: this.errorsExist ? this.errors.verify.isNotVeify.phone : 'Invalid code',
            })
        }
    }
}
