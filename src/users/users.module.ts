import { VerificationPhone } from './../verifications/entities/verification-phone.entiry'
import { VerificationEmail } from './../verifications/entities/verification-email.entiry'
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

@Module({
    imports: [
        TypeOrmModule.forFeature([User, VerificationEmail, VerificationPhone]),
        forwardRef(() => JwtModule),
        EmailModule,
        PhoneModule,
        LanguageModule,
    ],
    providers: [UsersService, UsersMutations, UsersQueries],
    exports: [UsersService],
})
export class UsersModule {}
