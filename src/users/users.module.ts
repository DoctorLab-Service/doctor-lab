import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotifiesModule } from 'src/notifies/notifies.module'
import { User } from './entities/user.entity'
import { UserResolver } from './users.resolver'
import { UserService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([User]), NotifiesModule],
    providers: [UserService, UserResolver],
})
export class UsersModule {}
