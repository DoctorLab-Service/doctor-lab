import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersQueries } from './resolvers/users.queries'
import { UsersMutations } from './resolvers/users.mutations'
import { Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { JwtModule } from 'src/jwt/jwt.module'

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule],
    providers: [UsersService, UsersMutations, UsersQueries],
})
export class UsersModule {}
