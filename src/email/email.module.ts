import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { EmailService } from './email.service'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { MailModuleOptions } from './types'

@Module({})
@Global()
export class EmailModule {
    static forRoot(options: MailModuleOptions): DynamicModule {
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
