import { Module } from '@nestjs/common'
import { HelpService } from './help.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HelpAnswer, HelpMessage } from 'src/help/entities'
import { User } from 'src/users/entities'
import { LanguageModule } from 'src/language/language.module'
import { TokenModule } from 'src/token/token.module'
import { EmailModule } from 'src/email/email.module'
import { HelpMutations } from './resolvers/help.mutations'
import { HelpQueries } from './resolvers/help.queries'

@Module({
    imports: [TypeOrmModule.forFeature([User, HelpMessage, HelpAnswer]), LanguageModule, TokenModule, EmailModule],
    providers: [HelpService, HelpQueries, HelpMutations],
    exports: [HelpService],
})
export class HelpModule {}
