import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { Messages } from 'src/language/dtos/notify.dto'
import { LanguageService } from 'src/language/language.service'
import { VerificationEmailInput, VerificationEmailOutput } from './dtos/verification-email.dto'
import { VerificationPhoneInput, VerificationPhoneOutput } from './dtos/verification-phone.dto'
import { VerificationsService } from './verifications.service'

@Resolver()
export class VerificationsResolver {
    errors: Messages

    constructor(
        private readonly verificationsService: VerificationsService,
        private readonly languageService: LanguageService,
    ) {
        this.languageService.errors(['verify']).then(res => (this.errors = res))
    }

    @Mutation(() => VerificationEmailOutput)
    async verificationEmail(@Args('input') code: VerificationEmailInput): Promise<VerificationEmailOutput> {
        return await this.verificationsService.verificationEmail(code, this.errors)
    }

    @Mutation(() => VerificationPhoneOutput)
    async verificationPhone(@Args('input') code: VerificationPhoneInput): Promise<VerificationPhoneOutput> {
        return await this.verificationsService.verificationPhone(code, this.errors)
    }
}
