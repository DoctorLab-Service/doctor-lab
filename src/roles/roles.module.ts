import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { Role } from './entities/role.entity'
import { UserRoles } from './entities/user_roles.entity'
import { LanguageModule } from 'src/language/language.module'
import { User } from 'src/users/entities/user.entity'
import { RolesQueries } from './resolvers/roles.queries'
import { RolesMutations } from './resolvers/roles.mutations'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from 'src/jwt/jwt.module'

@Module({
    imports: [TypeOrmModule.forFeature([Role, UserRoles, User]), LanguageModule, UsersModule, JwtModule],
    providers: [RolesService, RolesMutations, RolesQueries],
    exports: [RolesService],
})
export class RolesModule {}
