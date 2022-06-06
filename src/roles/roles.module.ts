import { RolesService } from './roles.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Role } from './entities/role.entity'
import { NotifiesModule } from 'src/notifies/notifies.module'
import { RolesMutation } from './resolvers/roles.mutations'

@Module({
    imports: [TypeOrmModule.forFeature([Role]), NotifiesModule],
    providers: [RolesService, RolesMutation],
    exports: [RolesService],
})
export class RolesModule {}
