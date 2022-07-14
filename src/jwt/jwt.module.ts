import { JwtService } from './jwt.service'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Token } from './entities/token.entity'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { User } from 'src/users/entities/user.entity'
import { JwtModuleOptions } from './types'

@Module({})
@Global()
export class JwtModule {
    static forRoot(options: JwtModuleOptions): DynamicModule {
        return {
            module: JwtModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                JwtService,
            ],
            imports: [TypeOrmModule.forFeature([Token, User])],
            exports: [JwtService],
        }
    }
}
