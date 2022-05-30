import { CONFIG_OPTIONS } from './../common/common.constants'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { IJwtModuleOptions } from './jwt.interfaces'
import { JwtService } from './jwt.service'

@Module({})
@Global()
export class JwtModule {
    static forRoot(options: IJwtModuleOptions): DynamicModule {
        return {
            module: JwtModule,
            providers: [
                // default properties
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                JwtService,
            ],
            exports: [JwtService],
        }
    }
}
