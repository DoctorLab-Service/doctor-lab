import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotifiesModule } from 'src/notifies/notifies.module'
import { ValidateModule } from 'src/validate/validate.module'
import { User } from './entities/user.entity'
import { UserResolver } from './users.resolver'
import { UserService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([User]), NotifiesModule, ValidateModule],
    providers: [UserService, UserResolver],
})
export class UsersModule {}
