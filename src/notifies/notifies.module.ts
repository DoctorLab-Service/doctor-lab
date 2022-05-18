import { Module } from '@nestjs/common'
import { NotifiesService } from './notifies.service'

@Module({
    providers: [NotifiesService],
    exports: [NotifiesService],
})
export class NotifiesModule {}
