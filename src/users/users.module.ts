import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotifiesModule } from 'src/notifies/notifies.module'
import { User } from './entities/user.entity'
import { UserResolver } from './users.resolver'
import { UserService } from './users.service'

@Module({
    imports: [forwardRef(() => NotifiesModule), TypeOrmModule.forFeature([User])],
    providers: [UserService, UserResolver],
})
export class UsersModule {}
