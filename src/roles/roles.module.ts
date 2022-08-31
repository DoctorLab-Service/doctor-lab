import { TypeOrmModule } from '@nestjs/typeorm'
import { forwardRef, Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { Role, UserRoles } from './entities'
import { LanguageModule } from 'src/language/language.module'
import { User } from 'src/users/entities'
import { RolesQueries } from './resolvers/roles.queries'
import { RolesMutations } from './resolvers/roles.mutations'
import { UsersModule } from 'src/users/users.module'
import { TokenModule } from 'src/token/token.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Role, UserRoles, User]),
        forwardRef(() => UsersModule),
        LanguageModule,
        TokenModule,
    ],
    providers: [RolesService, RolesMutations, RolesQueries],
    exports: [RolesService],
})
export class RolesModule {}
