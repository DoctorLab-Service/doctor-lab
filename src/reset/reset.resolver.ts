import { ResetService } from './reset.service'
import { ChangeEmailInput, ChangeOutput, ChangePasswordInput, ChangePhoneInput } from './dtos/change.dto'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ResetOutput } from './dtos/reset.dto'
import {
    ConfirmPhoneCodeInput,
    ConfirmCodeOutput,
    ConfirmEmailCodeInput,
    ConfirmPasswordInput,
    ConfirmOutput,
} from './dtos/confirm.dto'

@Resolver()
export class ResetResolver {
    constructor(private readonly resetService: ResetService) {}

    @Mutation(() => ResetOutput)
    async resetEmail(): Promise<ResetOutput> {
        return this.resetService.resetEmail()
    }

    @Mutation(() => ChangeOutput)
    async changeEmail(@Args('input') body: ChangeEmailInput): Promise<ChangeOutput> {
        return this.resetService.changeEmail(body)
    }

    @Mutation(() => ChangeOutput)
    async changePhone(@Args('input') body: ChangePhoneInput): Promise<ChangeOutput> {
        return this.resetService.changePhone(body)
    }

    @Mutation(() => ResetOutput)
    async resetPassword(): Promise<ResetOutput> {
        return this.resetService.resetPassword()
    }

    @Mutation(() => ChangeOutput)
    async changePassword(@Args('input') body: ChangePasswordInput): Promise<ChangeOutput> {
        return this.resetService.changePassword(body)
    }

    @Mutation(() => ConfirmOutput)
    async confirmPassword(@Args('input') body: ConfirmPasswordInput): Promise<ConfirmOutput> {
        return this.resetService.confirmPassword(body)
    }

    @Mutation(() => ChangeOutput)
    async confirmPhoneCode(@Args('input') body: ConfirmPhoneCodeInput): Promise<ConfirmCodeOutput> {
        return this.resetService.confirmPhoneCode(body)
    }

    @Mutation(() => ChangeOutput)
    async confirmEmailCode(@Args('input') body: ConfirmEmailCodeInput): Promise<ConfirmCodeOutput> {
        return this.resetService.confirmEmailCode(body)
    }
}
