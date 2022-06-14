import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class UsersQueries {
    @Query(() => String)
    UsersTest() {
        return 'Users Test'
    }
}
