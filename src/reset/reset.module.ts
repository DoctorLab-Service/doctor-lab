import { Module } from '@nestjs/common'
import { ResetResolver } from './reset.resolver'
import { ResetService } from './reset.service'

@Module({
    providers: [ResetResolver, ResetService],
})
export class ResetModule {}
