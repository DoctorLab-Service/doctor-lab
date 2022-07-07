import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { VerificationEmailInput, VerificationEmailOutput } from './dtos/verification-email.dto'
import { VerificationPhoneInput, VerificationPhoneOutput } from './dtos/verification-phone.dto'
import { VerificationsService } from './verifications.service'

@Resolver()
export class VerificationsResolver {
    constructor(private readonly verificationsService: VerificationsService) {}

    @Mutation(() => VerificationEmailOutput)
    async verificationEmail(@Args('input') code: VerificationEmailInput): Promise<VerificationEmailOutput> {
        return await this.verificationsService.verificationEmail(code)
    }

    @Mutation(() => VerificationPhoneOutput)
    async verificationPhone(@Args('input') code: VerificationPhoneInput): Promise<VerificationPhoneOutput> {
        return await this.verificationsService.verificationPhone(code)
    }
}
