import { SetUserRoleInput, SetUserRoleOutput } from './dtos/set-user-role.dto'
import { Inject, Injectable } from '@nestjs/common'
import { CONTEXT } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { ForbiddenException, ValidationException } from 'src/exceptions'
import { LanguageService } from 'src/language/language.service'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateRoleInput, CreateRoleOutput } from './dtos/create-role.dto'
import { DeleteRoleInput, DeleteRoleOutput } from './dtos/delete-role.dto'
import { FindAllRolesOutput } from './dtos/find.dto'
import { UpdateRoleInput, UpdateRoleOutput } from './dtos/update-role.dto'
import { Role } from './entities/role.entity'
import { DeleteUserRoleInput, DeleteUserRoleOutput } from './dtos/delete-user-role.dto'
import { UserRoles } from './entities/user_roles.entity'
import { string } from 'src/common/helpers'
import { relationsConfig } from 'src/common/configs'
import { JwtService } from 'src/jwt/jwt.service'

@Injectable()
export class RolesService {
    private user: User

    constructor(
        @Inject(CONTEXT) private readonly context,
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(UserRoles) private readonly userRoles: Repository<UserRoles>,
        @InjectRepository(Role) private readonly roles: Repository<Role>,
        private readonly languageService: LanguageService,
        private readonly jwt: JwtService,
    ) {
        this.jwt.getContextUser(this.context).then(user => (this.user = user))
    }
    async createRole(body: CreateRoleInput): Promise<CreateRoleOutput> {
        const checkRole = await this.roles.findOne({ where: { roleKey: string.trimRole(body.role) } })
        if (checkRole)
            throw new ValidationException({
                role: await this.languageService.setError(['isExists', 'role']),
            })

        // Succes to create system role
        if (body.system === true) {
            /**
             * !DELETE SYSTEM ROLE WITH PERMISIONS
             * TODO: DELETE SYSTEM ROLE WITH PERMISIONS
             */
            // role.system = body.system || role.system
            throw new ValidationException({
                role: await this.languageService.setError(['permission', 'createSystemRole']),
            })
        }

        const user = await this.users.findOne({ where: { id: this.user.id } })
        if (!user)
            throw new ForbiddenException({
                auth: await this.languageService.setError(['isNotAuth', 'auth']),
            })

        // Create role
        try {
            const role = await this.roles.save(this.roles.create({ ...body, user }))

            return { ok: true, role }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                role: await this.languageService.setError(['isNot', 'createRole']),
            })
        }
    }

    async updateRole(body: UpdateRoleInput): Promise<UpdateRoleOutput> {
        // Find role by id
        const role = await this.roles.findOne({ where: { id: body.id } })
        if (!role) {
            throw new ValidationException({
                role: await this.languageService.setError(['isNotFound', 'role']),
            })
        }

        // Check role on existing
        const checkExistRole = await this.roles.findOne({ where: { roleKey: string.trimRole(body.role) } })
        if (checkExistRole) {
            throw new ValidationException({
                role: await this.languageService.setError(['isExists', 'role']),
            })
        }

        if (body.role || body.description || body.system) {
            role.role = body.role || role.role
            role.description = body.description || role.description

            // Succes to update system role
            if (role.system === true) {
                /**
                 * !DELETE SYSTEM ROLE WITH PERMISIONS
                 * TODO: DELETE SYSTEM ROLE WITH PERMISIONS
                 */
                // role.system = body.system || role.system
                throw new ValidationException({
                    role: await this.languageService.setError(['permission', 'updateSystemRole'], null, role.role),
                })
            }
        } else {
            throw new ValidationException({
                role: await this.languageService.setError(['isEmpty', 'all']),
            })
        }

        // Update role
        try {
            const uRole = await this.roles.save(this.roles.create({ ...role }))
            // console.log(uRole)
            return { ok: true, role: uRole }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                role: await this.languageService.setError(['isNot', 'updateRole']),
            })
        }
    }

    async deleteRole({ id }: DeleteRoleInput): Promise<DeleteRoleOutput> {
        const dRole = await this.roles.findOne({ where: { id } })
        if (!dRole) throw new ValidationException({ role: await this.languageService.setError(['isNotFound', 'role']) })

        // Succes to delete system role
        if (dRole.system === true) {
            /**
             * !DELETE SYSTEM ROLE WITH PERMISIONS
             * TODO: DELETE SYSTEM ROLE WITH PERMISIONS
             */
            throw new ValidationException({
                role: await this.languageService.setError(['permission', 'deleteSystemRole'], null, dRole.role),
            })
        }

        // Delete role
        try {
            await this.roles.delete(id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ role: await this.languageService.setError(['isNot', 'deleteRole']) })
        }
    }

    async setUserRole(body: SetUserRoleInput): Promise<SetUserRoleOutput> {
        // Check candidat for role
        const candidate = await this.users.findOne({ where: { id: body.userId }, ...relationsConfig.users })
        if (!candidate)
            throw new ValidationException({
                user: await this.languageService.setError(['isNotFound', 'foundUser']),
            })

        const userSetTheRole = await this.users.findOne({ where: { id: this.user.id } })
        if (!userSetTheRole)
            throw new ForbiddenException({
                auth: await this.languageService.setError(['isNotAuth', 'auth']),
            })

        const roleKey = string.trimRole(body.role)
        console.log(roleKey)

        const role = await this.roles.findOne({ where: { roleKey } })
        if (!role)
            throw new ValidationException({
                roles: await this.languageService.setError(['isNotExist', 'role']),
            })

        await this.userRoles.save(this.userRoles.create({ role, user: candidate, setTheRole: userSetTheRole }))

        const user = await this.users.findOne({ where: { id: body.userId }, ...relationsConfig.users })
        return { ok: true, role, user }
    }

    async deleteUserRole(body: DeleteUserRoleInput): Promise<DeleteUserRoleOutput> {
        console.log(body)
        return { ok: true }
    }

    async findAllRoles(): Promise<FindAllRolesOutput> {
        try {
            const roles = await this.roles.find({ ...relationsConfig.roles })
            return { ok: true, roles }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                roles: await this.languageService.setError(['isNotFound', 'foundRoles']),
            })
        }
    }
}
