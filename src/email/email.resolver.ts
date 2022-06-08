import { UseGuards } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { EmailService } from 'src/email/email.service'
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto'

@Resolver()
export class EmailResolver {
    constructor(private readonly emailService: EmailService) {}

    @Mutation(() => VerifyEmailOutput)
    async verifyEmail(@Args('input') code: VerifyEmailInput): Promise<VerifyEmailOutput> {
        return await this.emailService.verificationEmail(code)
    }
}
