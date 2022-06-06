import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Clinic } from './entities/clinic.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Clinic])],
})
export class ClinicsModule {}
