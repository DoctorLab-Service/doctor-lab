import { TokenService } from './token.service'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Token } from './entities'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { LanguageModule } from 'src/language/language.module'
import { User } from 'src/users/entities'
import { TokenModuleOptions } from './config/types'

@Module({})
@Global()
export class TokenModule {
    static forRoot(options: TokenModuleOptions): DynamicModule {
        return {
            module: TokenModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                TokenService,
            ],
            imports: [TypeOrmModule.forFeature([Token, User]), LanguageModule],
            exports: [TokenService],
        }
    }
}
