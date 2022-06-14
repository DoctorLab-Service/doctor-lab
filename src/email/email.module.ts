import { NotifiesModule } from 'src/notifies/notifies.module'
import { EmailService } from './email.service'
import { Module } from '@nestjs/common'
import { EmailResolver } from './email.resolver'
import { User } from 'src/users/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VerifyEmail } from 'src/verifications/entities/verify-email.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User, VerifyEmail]), NotifiesModule],
    providers: [EmailService, EmailResolver],
    exports: [EmailService],
})
export class EmailModule {}
