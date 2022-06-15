import { UsersService } from './../users.service'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import {
    FindAllByRoleInput,
    FindAllOutput,
    FindByEmailInput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
} from '../dtos/find.dto'
import { setLanguageMessage } from 'src/notifies/set-language'

@Resolver()
export class UsersQueries {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => FindAllOutput)
    async findAll(@Context() { req: { user } }): Promise<FindAllOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findAll(errors)
    }

    @Query(() => FindAllOutput)
    async findAllByRole(@Args('input') body: FindAllByRoleInput, @Context() { req: { user } }): Promise<FindAllOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findAllByRole(body, errors)
    }

    @Query(() => FindByOutput)
    async findById(@Args('input') body: FindByIdInput, @Context() { req: { user } }): Promise<FindByOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findById(body, errors)
    }

    @Query(() => FindByOutput)
    async findByPhone(@Args('input') body: FindByPhoneInput, @Context() { req: { user } }): Promise<FindByOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findByPhone(body, errors)
    }

    @Query(() => FindByOutput)
    async findByEmail(@Args('input') body: FindByEmailInput, @Context() { req: { user } }): Promise<FindByOutput> {
        const errors = await setLanguageMessage({
            user: user.user,
            serviceName: ['users'],
            type: 'error',
        })
        return await this.usersService.findByEmail(body, errors)
    }
}
