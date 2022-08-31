import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { TokenModule } from 'src/token/token.module'
import { LanguageModule } from 'src/language/language.module'
import { User } from 'src/users/entities'

@Module({
    imports: [TypeOrmModule.forFeature([User]), LanguageModule, UsersModule, TokenModule],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule {}
