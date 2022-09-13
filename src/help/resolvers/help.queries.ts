import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/roles/roles.decorator'
import { EDefaultRoles } from 'src/roles/roles.enums'
import { RolesGuard } from 'src/roles/roles.guard'
import { FindAllHelpMessagesOutput, FindHelpMessageByIdOutput, FindHelpMessageByIdInput } from '../dtos'
import { HelpService } from '../help.service'

@UseGuards(AuthGuard, RolesGuard)
@Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
@Resolver()
export class HelpQueries {
    constructor(private readonly helpService: HelpService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    @Query(() => FindAllHelpMessagesOutput)
    async findAllHelpMessages(): Promise<FindAllHelpMessagesOutput> {
        return this.helpService.findAllHelpMessages()
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, EDefaultRoles.patient)
    @Query(() => FindHelpMessageByIdOutput)
    async findHelpMessageById(@Args('input') body: FindHelpMessageByIdInput): Promise<FindHelpMessageByIdOutput> {
        return this.helpService.findHelpMessageById(body)
    }
}
