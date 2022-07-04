import { JwtService } from './jwt.service'
import { ConfigModule } from '@nestjs/config'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Token } from './entities/token.entity'
import { User } from 'src/users/entities/user.entity'
import { UsersModule } from 'src/users/users.module'
import { JwtModuleoptions } from './dtos/jwt.dto'
import { CONFIG_OPTIONS } from 'src/common/common.constants'

@Module({})
@Global()
export class JwtModule {
    static forRoot(options: JwtModuleoptions): DynamicModule {
        return {
            module: JwtModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                JwtService,
            ],
            imports: [TypeOrmModule.forFeature([User, Token]), ConfigModule, UsersModule],
            exports: [JwtService],
        }
    }
}
