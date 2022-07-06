import { Messages } from './../../language/dtos/notify.dto'
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
import { LanguageService } from 'src/language/language.service'

@Resolver()
@UseGuards(AuthGuard)
export class UsersQueries {
    errors: Messages

    constructor(private readonly usersService: UsersService, private readonly languageService: LanguageService) {
        this.languageService.errors(['users']).then(res => (this.errors = res))
    }

    @Query(() => FindAllOutput)
    async findAll(): Promise<FindAllOutput> {
        return await this.usersService.findAll(this.errors)
    }

    // @Query(() => FindAllOutput)
    // async findAllByRole(@Args('input') body: FindAllByRoleInput): Promise<FindAllOutput> {
    //     return await this.usersService.findAllByRole(body, this.errors)
    // }

    @Query(() => FindByOutput)
    async findById(@Args('input') body: FindByIdInput): Promise<FindByOutput> {
        return await this.usersService.findById(body, this.errors)
    }

    @Query(() => FindByOutput)
    async findByPhone(@Args('input') body: FindByPhoneInput): Promise<FindByOutput> {
        return await this.usersService.findByPhone(body, this.errors)
    }

    @UseGuards(AuthGuard)
    @Query(() => FindByOutput)
    async findByEmail(@Args('input') body: FindByEmailInput): Promise<FindByOutput> {
        return await this.usersService.findByEmail(body, this.errors)
    }
}
