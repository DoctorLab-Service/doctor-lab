import { Resolver, Query } from '@nestjs/graphql'

@Resolver()
export class UsersResolver {
    @Query(() => String)
    hi(): string {
        return 'SOME HI'
    }
}
