import { Query, Resolver } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { UseGuards } from '@nestjs/common'
import { RolesService } from '../roles.service'
import { FindAllRolesOutput } from '../dtos/find.dto'
import { RolesGuard } from '../roles.guard'
import { Roles } from '../roles.decorator'
import { EDefaultRoles } from '../roles.enums'

@UseGuards(AuthGuard, RolesGuard)
@Roles(EDefaultRoles.admin, EDefaultRoles.doctor)
@Resolver()
export class RolesQueries {
    constructor(private readonly rolesService: RolesService) {}

    @Query(() => FindAllRolesOutput)
    async findAllRoles(): Promise<FindAllRolesOutput> {
        return this.rolesService.findAllRoles()
    }
}
