import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmailModule } from 'src/email/email.module'
import { TokenModule } from 'src/token/token.module'
import { LanguageModule } from 'src/language/language.module'
import { PhoneModule } from 'src/phone/phone.module'
import { User } from 'src/users/entities'
import { ConfirmEmail, ConfirmPhone, VerificationEmail, VerificationPhone } from './entities'
import { VerificationsResolver } from './verifications.resolver'
import { VerificationsService } from './verifications.service'
import { Token } from 'src/token/entities'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, VerificationEmail, VerificationPhone, ConfirmEmail, ConfirmPhone, Token]),
        forwardRef(() => TokenModule),
        LanguageModule,
        EmailModule,
        PhoneModule,
    ],
    providers: [VerificationsService, VerificationsResolver],
    exports: [VerificationsService],
})
export class VerificationsModule {}
