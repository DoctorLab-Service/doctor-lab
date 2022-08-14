import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { EmailService } from './email.service'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { EMailModuleOptions } from './dtos/mail.dtos'

@Module({})
@Global()
export class EmailModule {
    static forRoot(options: EMailModuleOptions): DynamicModule {
        return {
            module: EmailModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                EmailService,
            ],
            exports: [EmailService],
        }
    }
}
