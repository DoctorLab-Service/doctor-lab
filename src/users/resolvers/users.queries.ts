import { Resolver, Args, Query } from '@nestjs/graphql'
import {
    FindAllByOutput,
    FindAllByRoleIenput,
    FindByEmailInput,
    FindByIdInput,
    FindByOutput,
    FindByPhoneInput,
} from '../dtos/find.dto'
import { UserService } from '../users.service'

@Resolver()
export class UserQueries {
    constructor(private readonly usersService: UserService) {}

    /*
        Queries Find By:
        - id
        - phone
        - email
     */
    @Query(() => FindByOutput)
    async findById(@Args('input') findBy: FindByIdInput): Promise<FindByOutput> {
        return await this.usersService.findById(findBy)
    }

    @Query(() => FindByOutput)
    async findByPhone(@Args('input') findBy: FindByPhoneInput): Promise<FindByOutput> {
        return await this.usersService.findByPhone(findBy)
    }

    @Query(() => FindByOutput)
    async findByEmail(@Args('input') findBy: FindByEmailInput): Promise<FindByOutput> {
        return await this.usersService.findByEmail(findBy)
    }

    /*
        Queries Find All By:
        - Role
    */
    @Query(() => FindAllByOutput)
    async findAllByRole(@Args('input') findAllBy: FindAllByRoleIenput): Promise<FindAllByOutput> {
        return await this.usersService.findAllByRole(findAllBy)
    }
}
