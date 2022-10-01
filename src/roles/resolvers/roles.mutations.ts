import { LenguageInterceptor } from 'src/language/language.interceptor'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthGuard } from 'src/auth/auth.guard'
import { UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { RolesService } from '../roles.service'
import { CreateRoleInput, CreateRoleOutput } from '../dtos/create-role.dto'
import { UpdateRoleInput, UpdateRoleOutput } from '../dtos/update-role.dto'
import { DeleteRoleInput, DeleteRoleOutput } from '../dtos/delete-role.dto'
import { SetUserRoleInput, SetUserRoleOutput } from '../dtos/set-user-role.dto'
import { DeleteUserRoleInput, DeleteUserRoleOutput } from '../dtos/delete-user-role.dto'
import { RolesGuard } from '../roles.guard'
import { Roles } from '../roles.decorator'
import { EDefaultRoles, ESystemsRoles } from '../roles.enums'

@UseGuards(AuthGuard, RolesGuard)
@Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist, ESystemsRoles.super_admin)
@Resolver()
export class RolesMutations {
    constructor(private readonly rolesService: RolesService) {}

    @Mutation(() => CreateRoleOutput)
    @UseInterceptors(new LenguageInterceptor())
    @UsePipes(new ValidationPipe('roles'))
    async createRole(@Args('input') body: CreateRoleInput, @Context() context: any): Promise<CreateRoleOutput> {
        return this.rolesService.createRole(body, context)
    }

    @Mutation(() => UpdateRoleOutput)
    @UseInterceptors(new LenguageInterceptor())
    @UsePipes(new ValidationPipe('roles'))
    async updateRole(@Args('input') body: UpdateRoleInput, @Context() context: any): Promise<UpdateRoleOutput> {
        return this.rolesService.updateRole(body, context)
    }

    @Mutation(() => DeleteRoleOutput)
    async deleteRole(@Args('input') body: DeleteRoleInput, @Context() context: any): Promise<DeleteRoleOutput> {
        return this.rolesService.deleteRole(body, context)
    }

    @Mutation(() => SetUserRoleOutput)
    async setUserRole(@Args('input') body: SetUserRoleInput, @Context() context: any): Promise<SetUserRoleOutput> {
        return this.rolesService.setUserRole(body, context)
    }
    @Mutation(() => DeleteUserRoleOutput)
    async deleteUserRole(@Args('input') body: DeleteUserRoleInput): Promise<DeleteUserRoleOutput> {
        return this.rolesService.deleteUserRole(body)
    }
}
