import { LanguageModule } from 'src/language/language.module'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { TokenModule } from 'src/token/token.module'
import { FilesModuleCloudinatyConfig } from './files'
import { FilesResolver } from './files.resolver'
import { FilesService } from './files.services'
import { Cloudinary } from './libs/cloudinary.libs'

@Module({})
@Global()
export class FilesModule {
    static forRoot(options: FilesModuleCloudinatyConfig): DynamicModule {
        return {
            module: FilesModule,
            providers: [
                FilesService,
                FilesResolver,
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                {
                    provide: Cloudinary,
                    inject: [CONFIG_OPTIONS],
                    useFactory(config) {
                        return new Cloudinary(config)
                    },
                },
            ],
            imports: [TokenModule, LanguageModule],
            exports: [FilesService],
        }
    }
}
