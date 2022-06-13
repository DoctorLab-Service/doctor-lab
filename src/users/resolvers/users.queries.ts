import { AuthGuard } from './../../auth/auth.guard'
import { UseGuards } from '@nestjs/common'
import { Resolver, Args, Query, Context } from '@nestjs/graphql'
import {
    FindAllOutput,
    FindAllByRoleInput,
    FindByEmailInput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
} from '../dtos/find.dto'
import { UserService } from '../users.service'
import { setLanguageMessage } from 'src/notifies/language'

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
    async findById(@Args('input') findBy: FindByIdInput, @Context() { req: { user } }): Promise<FindByOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findById(findBy, errors)
    }

    @UseGuards(AuthGuard)
    @Query(() => FindByOutput)
    async findByPhone(@Args('input') findBy: FindByPhoneInput, @Context() { req: { user } }): Promise<FindByOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findByPhone(findBy, errors)
    }

    @UseGuards(AuthGuard)
    @Query(() => FindByOutput)
    async findByEmail(@Args('input') findBy: FindByEmailInput, @Context() { req: { user } }): Promise<FindByOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findByEmail(findBy, errors)
    }

    /*
    Queries Find All By:
    + All
    + Role
    */
    @UseGuards(AuthGuard)
    @Query(() => FindAllOutput)
    async findAll(@Context() { req: { user } }): Promise<FindAllOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findAll(errors)
    }

    @UseGuards(AuthGuard)
    @Query(() => FindAllOutput)
    async findAllByRole(
        @Args('input') findAllBy: FindAllByRoleInput,
        @Context() { req: { user } },
    ): Promise<FindAllOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findAllByRole(findAllBy, errors)
    }
}
