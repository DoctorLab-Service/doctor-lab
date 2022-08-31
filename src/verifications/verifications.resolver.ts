import { UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { LenguageInterceptor } from 'src/language/language.interceptor'
import { Roles } from 'src/roles/roles.decorator'
import { EDefaultRoles } from 'src/roles/roles.enums'
import { RolesGuard } from 'src/roles/roles.guard'
import {
    RecoveryOutput,
    PasswordRecoveryCodeInput,
    ChangeOutputCode,
    VerificationOutput,
    VerificationInput,
} from './dtos'
import { VerificationsService } from './verifications.service'

@Resolver()
export class VerificationsResolver {
    constructor(private readonly verificationsService: VerificationsService) {}

    @Mutation(() => RecoveryOutput)
    @UsePipes(new ValidationPipe('users'))
    @UseInterceptors(new LenguageInterceptor())
    async passwordRecoveryCode(@Args('input') body: PasswordRecoveryCodeInput): Promise<RecoveryOutput> {
        return this.verificationsService.passwordRecoveryCode(body)
    }

    @Mutation(() => ChangeOutputCode)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    async changePasswordCode(): Promise<ChangeOutputCode> {
        return this.verificationsService.changePasswordCode()
    }

    @Mutation(() => ChangeOutputCode)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    async changeEmailCode(): Promise<ChangeOutputCode> {
        return this.verificationsService.changeEmailCode()
    }

    @Mutation(() => ChangeOutputCode)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    async changePhoneCode(): Promise<ChangeOutputCode> {
        return this.verificationsService.changePhoneCode()
    }

    @Mutation(() => VerificationOutput)
    @UseInterceptors(new LenguageInterceptor())
    async verificationEmail(@Args('input') code: VerificationInput): Promise<VerificationOutput> {
        return await this.verificationsService.verificationEmail(code)
    }

    @Mutation(() => VerificationOutput)
    @UseInterceptors(new LenguageInterceptor())
    async verificationPhone(@Args('input') code: VerificationInput): Promise<VerificationOutput> {
        return await this.verificationsService.verificationPhone(code)
    }

    @Mutation(() => VerificationOutput)
    @UseInterceptors(new LenguageInterceptor())
    async verificationPasswordRecovery(@Args('input') code: VerificationInput): Promise<VerificationOutput> {
        return await this.verificationsService.verificationPasswordRecovery(code)
    }

    @Mutation(() => VerificationOutput)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    @UseInterceptors(new LenguageInterceptor())
    async verificationChangePassword(@Args('input') code: VerificationInput): Promise<VerificationOutput> {
        return await this.verificationsService.verificationChangePassword(code)
    }

    @Mutation(() => VerificationOutput)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    @UseInterceptors(new LenguageInterceptor())
    async verificationChangeEmail(@Args('input') code: VerificationInput): Promise<VerificationOutput> {
        return await this.verificationsService.verificationChangeEmail(code)
    }

    @Mutation(() => VerificationOutput)
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    @UseInterceptors(new LenguageInterceptor())
    async verificationChangePhone(@Args('input') code: VerificationInput): Promise<VerificationOutput> {
        return await this.verificationsService.verificationChangePhone(code)
    }
}
