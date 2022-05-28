import { Resolver, Args, Query } from '@nestjs/graphql'
import { FindAllByRoleIenput, FindByEmailInput, FindByIdInput, FindByOutput, FindByPhoneInput } from '../dtos/find.dto'
import { UserService } from '../users.service'

@Resolver()
export class UserQueries {
    constructor(private readonly usersService: UserService) {}

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

    @Query(() => FindByOutput)
    async findAllByRole(@Args('input') findAllBy: FindAllByRoleIenput): Promise<FindByOutput> {
        return await this.usersService.findAllByRole(findAllBy)
    }
}
