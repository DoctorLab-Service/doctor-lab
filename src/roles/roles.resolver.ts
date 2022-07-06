import { LenguageInterceptor } from 'src/language/language.interceptor'
import { RolesService } from './roles.service'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { DeleteRoleInput, DeleteRoleOutput } from './dtos/delete-role.dto'
import { UpdateRoleInput, UpdateRoleOutput } from './dtos/update-role.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { UseGuards, UseInterceptors, UsePipes } from '@nestjs/common'
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { CreateRoleInput, CreateRoleOutput } from './dtos/create-role.dto'

@UseGuards(AuthGuard)
@Resolver()
export class RolesResolver {
    constructor(private readonly rolesService: RolesService) {}

    @Mutation(() => CreateRoleOutput)
    @UseInterceptors(new LenguageInterceptor())
    @UsePipes(new ValidationPipe('roles'))
    async createRole(@Args('input') body: CreateRoleInput): Promise<CreateRoleOutput> {
        return this.rolesService.createRole(body)
    }

    @Mutation(() => UpdateRoleOutput)
    @UseInterceptors(new LenguageInterceptor())
    @UsePipes(new ValidationPipe('roles'))
    async updateRole(@Args('input') body: UpdateRoleInput): Promise<UpdateRoleOutput> {
        return this.rolesService.updateRole(body)
    }

    @Mutation(() => DeleteRoleOutput)
    async deleteRole(@Args('input') body: DeleteRoleInput): Promise<DeleteRoleOutput> {
        return this.rolesService.deleteRole(body)
    }
}
