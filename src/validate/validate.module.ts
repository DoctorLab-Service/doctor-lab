import { Module } from '@nestjs/common'
import { ValidateService } from './validate.service'

@Module({
    providers: [ValidateService],
    exports: [ValidateService],
})
export class ValidateModule {}
