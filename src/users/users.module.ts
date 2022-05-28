import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotifiesModule } from 'src/notifies/notifies.module'
import { User } from './entities/user.entity'
// import { UserResolver } from './users.resolver'
import { UserMutations } from './resolvers/users.mutations'
import { UserQueries } from './resolvers/users.queries'
import { UserService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([User]), NotifiesModule],
    providers: [UserService, UserQueries, UserMutations],
})
export class UsersModule {}
