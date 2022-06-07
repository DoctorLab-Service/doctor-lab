import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { NotifiesModule } from 'src/notifies/notifies.module'
import { PhoneResolver } from './phone.resolver'
import { PhoneService } from './phone.service'
import { User } from 'src/users/entities/user.entity'
import { VerifyPhone } from 'src/users/entities/verify-phone.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User, VerifyPhone]), NotifiesModule],
    providers: [PhoneService, PhoneResolver],
    exports: [PhoneService],
})
export class PhoneModule {}
