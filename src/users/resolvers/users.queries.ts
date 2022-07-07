import { UsersService } from './../users.service'
import { Args, Query, Resolver } from '@nestjs/graphql'
import {
    // FindAllByRoleInput,
    FindAllOutput,
    FindByEmailInput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
} from '../dtos/find.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { UseGuards } from '@nestjs/common'

@Resolver()
@UseGuards(AuthGuard)
export class UsersQueries {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => FindAllOutput)
    async findAll(): Promise<FindAllOutput> {
        return await this.usersService.findAll()
    }

    // @Query(() => FindAllOutput)
    // async findAllByRole(@Args('input') body: FindAllByRoleInput): Promise<FindAllOutput> {
    //     return await this.usersService.findAllByRole(body)
    // }

    @Query(() => FindByOutput)
    async findById(@Args('input') body: FindByIdInput): Promise<FindByOutput> {
        return await this.usersService.findById(body)
    }

    @Query(() => FindByOutput)
    async findByPhone(@Args('input') body: FindByPhoneInput): Promise<FindByOutput> {
        return await this.usersService.findByPhone(body)
    }

    @UseGuards(AuthGuard)
    @Query(() => FindByOutput)
    async findByEmail(@Args('input') body: FindByEmailInput): Promise<FindByOutput> {
        return await this.usersService.findByEmail(body)
    }
}
