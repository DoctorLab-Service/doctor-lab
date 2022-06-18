import { JwtModule } from 'src/jwt/jwt.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersQueries } from './resolvers/users.queries'
import { UsersMutations } from './resolvers/users.mutations'
import { forwardRef, Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => JwtModule)],
    providers: [UsersService, UsersMutations, UsersQueries],
    exports: [UsersService],
})
export class UsersModule {}
