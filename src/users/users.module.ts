import { PhoneModule } from './../phone/phone.module'
import { JwtModule } from './../jwt/jwt.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NotifiesModule } from 'src/notifies/notifies.module'
import { User } from './entities/user.entity'
import { UserMutations } from './resolvers/users.mutations'
import { UserQueries } from './resolvers/users.queries'
import { UserService } from './users.service'
import { EmailModule } from 'src/email/email.module'
import { VerifyEmail } from 'src/verifications/entities/verify-email.entity'
import { VerifyPhone } from 'src/verifications/entities/verify-phone.entity'

@Module({
    imports: [
        TypeOrmModule.forFeature([User, VerifyEmail, VerifyPhone]),
        NotifiesModule,
        EmailModule,
        PhoneModule,
        JwtModule,
    ],
    providers: [UserService, UserQueries, UserMutations],
    exports: [UserService],
})
export class UsersModule {}
