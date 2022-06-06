import { AuthGuard } from './../../auth/auth.guard'
import { UseGuards } from '@nestjs/common'
import { Resolver, Args, Query } from '@nestjs/graphql'
import {
    FindAllOutput,
    FindAllByRoleInput,
    FindByEmailInput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
    FindAllInput,
} from '../dtos/find.dto'
import { UserService } from '../users.service'

@Resolver()
export class UserQueries {
    constructor(private readonly usersService: UserService) {}

    /*
        Queries Find By:
        + id
        + phone
        + email
     */
    @UseGuards(AuthGuard)
    @Query(() => FindByOutput)
    async findById(@Args('input') findBy: FindByIdInput): Promise<FindByOutput> {
        return await this.usersService.findById(findBy)
    }

    @UseGuards(AuthGuard)
    @Query(() => FindByOutput)
    async findByPhone(@Args('input') findBy: FindByPhoneInput): Promise<FindByOutput> {
        return await this.usersService.findByPhone(findBy)
    }

    @UseGuards(AuthGuard)
    @Query(() => FindByOutput)
    async findByEmail(@Args('input') findBy: FindByEmailInput): Promise<FindByOutput> {
        return await this.usersService.findByEmail(findBy)
    }

    /*
    Queries Find All By:
    + All
    + Role
    */
    @UseGuards(AuthGuard)
    @Query(() => FindAllOutput)
    async findAll(@Args('input') findAll: FindAllInput): Promise<FindAllOutput> {
        return await this.usersService.findAll(findAll)
    }

    @UseGuards(AuthGuard)
    @Query(() => FindAllOutput)
    async findAllByRole(@Args('input') findAllBy: FindAllByRoleInput): Promise<FindAllOutput> {
        return await this.usersService.findAllByRole(findAllBy)
    }
}
