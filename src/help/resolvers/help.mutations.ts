import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/roles/roles.decorator'
import { EDefaultRoles } from 'src/roles/roles.enums'
import { RolesGuard } from 'src/roles/roles.guard'
import {
    CreateHelpMessageOutput,
    CreateHelpMessageInput,
    DeleteHelpMessageOutput,
    DeleteHelpMessageInput,
    ReadHelpMessageOutput,
    ReadHelpMessageInput,
    AnswerToHelpMessageInput,
    AnswerToHelpMessageOutput,
    CloseHelpMessageInput,
    CloseHelpMessageOutput,
} from '../dtos'
import { HelpService } from '../help.service'

@Resolver()
export class HelpMutations {
    constructor(private readonly helpService: HelpService) {}

    @Mutation(() => CreateHelpMessageOutput)
    async createHelpMessage(@Args('input') body: CreateHelpMessageInput): Promise<CreateHelpMessageOutput> {
        return this.helpService.createHelpMessage(body)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    @Mutation(() => DeleteHelpMessageOutput)
    async deleteHelpMessage(@Args('input') body: DeleteHelpMessageInput): Promise<DeleteHelpMessageOutput> {
        return this.helpService.deleteHelpMessage(body)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    @Mutation(() => ReadHelpMessageOutput)
    async readHelpMessage(@Args('input') body: ReadHelpMessageInput): Promise<ReadHelpMessageOutput> {
        return this.helpService.readHelpMessage(body)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    @Mutation(() => AnswerToHelpMessageOutput)
    async answerToHelpMessage(
        @Args('input') body: AnswerToHelpMessageInput,
        @Context() context: any,
    ): Promise<AnswerToHelpMessageOutput> {
        return this.helpService.answerToHelpMessage(body, context)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    @Mutation(() => CloseHelpMessageOutput)
    async closeHelpMessage(@Args('input') body: CloseHelpMessageInput): Promise<CloseHelpMessageOutput> {
        return this.helpService.closeHelpMessage(body)
    }
}
