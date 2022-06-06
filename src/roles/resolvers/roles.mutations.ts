import { AddRoleInput, AddRoleOutput } from './../dtos/add-role.dto'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { RolesService } from '../roles.service'
import { DeleteRoleInput, DeleteRoleOutput } from '../dtos/delete-role.dto'
import { UpdateRoleInput, UpdateRoleOutput } from '../dtos/update-role.dto'

@Resolver()
export class RolesMutation {
    constructor(private readonly rolesService: RolesService) {}

    @Mutation(() => AddRoleOutput)
    async addRole(@Args('input') addRole: AddRoleInput): Promise<AddRoleOutput> {
        return this.rolesService.addRole(addRole)
    }
    @Mutation(() => UpdateRoleOutput)
    async updateRole(@Args('input') updateRole: UpdateRoleInput): Promise<UpdateRoleOutput> {
        return this.rolesService.updateRole(updateRole)
    }
    @Mutation(() => DeleteRoleOutput)
    async deleteRole(@Args('input') deleteRole: DeleteRoleInput): Promise<DeleteRoleOutput> {
        return this.rolesService.deleteRole(deleteRole)
    }
}
