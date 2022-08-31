import { TokenModule } from 'src/token/token.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersQueries } from './resolvers/users.queries'
import { UsersMutations } from './resolvers/users.mutations'
import { forwardRef, Module } from '@nestjs/common'
import { User } from './entities'
import { UsersService } from './users.service'
import { EmailModule } from 'src/email/email.module'
import { PhoneModule } from 'src/phone/phone.module'
import { LanguageModule } from 'src/language/language.module'
import { FilesModule } from 'src/files/files.module'
import { RolesModule } from 'src/roles/roles.module'
import { UserRoles } from 'src/roles/entities'
import { VerificationEmail, VerificationPhone } from 'src/verifications/entities'
import { VerificationsModule } from 'src/verifications/verifications.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRoles, VerificationEmail, VerificationPhone]),
        forwardRef(() => TokenModule),
        forwardRef(() => RolesModule),
        FilesModule,
        EmailModule,
        PhoneModule,
        LanguageModule,
        RolesModule,
        VerificationsModule,
    ],
    providers: [UsersService, UsersMutations, UsersQueries],
    exports: [UsersService],
})
export class UsersModule {}
