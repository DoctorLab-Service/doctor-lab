import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesResolver } from './roles.resolver'
import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { Role } from './entities/role.entity'
import { UserRoles } from './entities/user_roles.entity'
import { LanguageModule } from 'src/language/language.module'
import { User } from 'src/users/entities/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Role, UserRoles, User]), LanguageModule],
    providers: [RolesService, RolesResolver],
    exports: [RolesService],
})
export class RolesModule {}
