import { Query, Resolver } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { UseGuards } from '@nestjs/common'
import { RolesService } from '../roles.service'
import { FindAllRolesOutput } from '../dtos/find.dto'
import { Roles } from '../roles.decorator'
import { RolesGuard } from '../roles.guard'

@UseGuards(AuthGuard)
@Resolver()
export class RolesQueries {
    constructor(private readonly rolesService: RolesService) {}

    @Roles('super_admin', 'admin')
    @UseGuards(RolesGuard)
    @Query(() => FindAllRolesOutput)
    async findAllRoles(): Promise<FindAllRolesOutput> {
        return this.rolesService.findAllRoles()
    }
}
