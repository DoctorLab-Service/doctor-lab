import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { User } from 'src/users/entities/user.entity'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from 'src/jwt/jwt.module'

@Module({
    imports: [TypeOrmModule.forFeature([User]), UsersModule, JwtModule],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
