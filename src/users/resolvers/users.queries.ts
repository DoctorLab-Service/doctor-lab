import { Args, Query, Resolver } from '@nestjs/graphql'
import { FindAllUsersOutput, FindByEmailInput, FindByIdInput, FindByOutput, FindByPhoneInput } from '../dtos/find.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { UseGuards } from '@nestjs/common'
import { UsersService } from '../users.service'
import { MyAccountOutput } from '../dtos/my-account.dto'
import { RolesGuard } from 'src/roles/roles.guard'
import { EDefaultRoles } from 'src/roles/roles.enums'
import { Roles } from 'src/roles/roles.decorator'

@UseGuards(AuthGuard, RolesGuard)
@Roles(EDefaultRoles.admin, EDefaultRoles.doctor, EDefaultRoles.dentist)
@Resolver()
export class UsersQueries {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => MyAccountOutput)
    async myAccount(): Promise<MyAccountOutput> {
        return this.usersService.myAccount()
    }
    @Query(() => FindAllUsersOutput)
    async findAllUsers(): Promise<FindAllUsersOutput> {
        return this.usersService.findAllUsers()
    }

    @Query(() => FindByOutput)
    async findById(@Args('input') body: FindByIdInput): Promise<FindByOutput> {
        return this.usersService.findById(body)
    }

    @Query(() => FindByOutput)
    async findByPhone(@Args('input') body: FindByPhoneInput): Promise<FindByOutput> {
        return this.usersService.findByPhone(body)
    }

    @UseGuards(AuthGuard)
    @Query(() => FindByOutput)
    async findByEmail(@Args('input') body: FindByEmailInput): Promise<FindByOutput> {
        return this.usersService.findByEmail(body)
    }
}
