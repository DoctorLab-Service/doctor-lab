import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmailModule } from 'src/email/email.module'
import { LanguageModule } from 'src/language/language.module'
import { User } from 'src/users/entities/user.entity'
import { VerificationEmail } from './entities/verification-email.entiry'
import { VerificationPhone } from './entities/verification-phone.entiry'
import { VerificationsResolver } from './verifications.resolver'
import { VerificationsService } from './verifications.service'

@Module({
    imports: [TypeOrmModule.forFeature([User, VerificationEmail, VerificationPhone]), LanguageModule, EmailModule],
    providers: [VerificationsService, VerificationsResolver],
    exports: [VerificationsService],
})
export class VerificationsModule {}
