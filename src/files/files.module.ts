import { LanguageModule } from 'src/language/language.module'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { TokenModule } from 'src/token/token.module'
import { FilesModuleCloudinatyConfig } from './files'
import { FilesResolver } from './files.resolver'
import { FilesService } from './files.services'

@Module({})
@Global()
export class FilesModule {
    static forRoot(options: FilesModuleCloudinatyConfig): DynamicModule {
        return {
            module: FilesModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                FilesService,
                FilesResolver,
            ],
            imports: [TokenModule, LanguageModule],
            exports: [FilesService],
        }
    }
}
