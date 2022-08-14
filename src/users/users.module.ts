import { JwtModule } from 'src/jwt/jwt.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersQueries } from './resolvers/users.queries'
import { UsersMutations } from './resolvers/users.mutations'
import { forwardRef, Module } from '@nestjs/common'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'
import { EmailModule } from 'src/email/email.module'
import { PhoneModule } from 'src/phone/phone.module'
import { LanguageModule } from 'src/language/language.module'
import { UserRoles } from 'src/roles/entities/user_roles.entity'
import { VerificationEmail } from 'src/verifications/entities/verification-email.entiry'
import { VerificationPhone } from 'src/verifications/entities/verification-phone.entiry'
import { FilesModule } from 'src/files/files.module'
import { RolesModule } from 'src/roles/roles.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRoles, VerificationEmail, VerificationPhone]),
        forwardRef(() => JwtModule),
        forwardRef(() => RolesModule),
        FilesModule,
        EmailModule,
        PhoneModule,
        LanguageModule,
        RolesModule,
    ],
    providers: [UsersService, UsersMutations, UsersQueries],
    exports: [UsersService],
})
export class UsersModule {}
