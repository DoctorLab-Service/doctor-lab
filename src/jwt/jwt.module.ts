import { JwtService } from './jwt.service'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Token } from './entities/token.entity'
import { User } from 'src/users/entities/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User, Token]), ConfigModule],
    providers: [JwtService],
    exports: [JwtService],
})
export class JwtModule {}
