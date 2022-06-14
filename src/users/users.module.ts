import { UsersQueries } from './resolvers/users.queries'
import { UsersMutations } from './resolvers/users.mutations'
import { Module } from '@nestjs/common'

@Module({
    providers: [UsersMutations, UsersQueries],
})
export class UsersModule {}
