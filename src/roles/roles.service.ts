import { EDefaultRoles } from 'src/roles/roles.enums'
import { ERolesType, ESystemsRoles } from './roles.enums'
import { SetUserRoleInput, SetUserRoleOutput } from './dtos/set-user-role.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ValidationException } from 'src/exceptions'
import { LanguageService } from 'src/language/language.service'
import { Repository } from 'typeorm'
import { CreateRoleInput, CreateRoleOutput } from './dtos/create-role.dto'
import { DeleteRoleInput, DeleteRoleOutput } from './dtos/delete-role.dto'
import { FindAllRolesOutput } from './dtos/find.dto'
import { UpdateRoleInput, UpdateRoleOutput } from './dtos/update-role.dto'
import { DeleteUserRoleInput, DeleteUserRoleOutput } from './dtos/delete-user-role.dto'
import { string } from 'src/common/helpers'
import { relationsConfig } from 'src/common/configs'
import { User } from 'src/users/entities'
import { UserRoles, Role } from './entities'
import { getCurrentUser } from 'src/users/helpers'

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(UserRoles) private readonly userRoles: Repository<UserRoles>,
        @InjectRepository(Role) private readonly roles: Repository<Role>,
        private readonly languageService: LanguageService,
    ) {}

    /**
     * Create default roles in database.
     * @returns true if create roles or roles are exist in database
     */
    async _deffaultRoles(): Promise<boolean> {
        try {
            const roles = await this.roles.find({})
            const existedRoles = []

            await roles.forEach(role => {
                existedRoles.push(role.roleKey)
            })

            const deffaultRoles = Object.keys({ ...EDefaultRoles, ...ESystemsRoles })

            await deffaultRoles.forEach(async role => {
                if (existedRoles.indexOf(role) === -1) {
                    await this.roles.save(
                        this.roles.create({
                            role: role,
                            description: 'Default system role',
                            type: ERolesType.system,
                            user: null,
                        }),
                    )
                }
            })

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * Create new role
     * @param body roles data
     * @returns created role
     */
    async createRole(body: CreateRoleInput, context): Promise<CreateRoleOutput> {
        const checkRole = await this.roles.findOne({ where: { roleKey: string.trimRole(body.role) } })

        if (checkRole) {
            throw new ValidationException({
                exists: await this.languageService.setError(['isExists', 'role']),
            })
        }

        // Succes to create system role
        if (body.type === ERolesType.system) {
            // Check current user role by existing systems roles
            const currentUser: User = getCurrentUser(context)
            const existSystemRole = currentUser.roles.filter(role => {
                return role.role.roleKey === ESystemsRoles.super_admin
            })
            if (!existSystemRole.length) {
                throw new ValidationException({
                    permission: await this.languageService.setError(['permission', 'createSystemRole']),
                })
            }
        }

        const currentUser: User = getCurrentUser(context)
        const user = await this.users.findOne({ where: { id: currentUser.id } })
        if (!user) {
            throw new ValidationException({
                not_exist: await this.languageService.setError(['isNotExist', 'user'], 'users'),
            })
        }

        // Create role
        try {
            const role = await this.roles.save(this.roles.create({ ...body, user }))
            return { ok: Boolean(role), role }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                create: await this.languageService.setError(['isNot', 'createRole']),
            })
        }
    }

    /**
     * Update role by id
     * @param body roles data, and id
     * @returns updated role
     */
    async updateRole(body: UpdateRoleInput, context): Promise<UpdateRoleOutput> {
        // Find role by id
        const role = await this.roles.findOne({ where: { id: body.id } })
        if (!role) {
            throw new ValidationException({
                not_found: await this.languageService.setError(['isNot', 'foundRole']),
            })
        }

        // Check current user role by existing systems roles
        const currentUser: User = await getCurrentUser(context)
        const existSystemRole = currentUser.roles.filter(role => role.role.roleKey === ESystemsRoles.super_admin)

        // Check user, if he owner role or have permisiion to updatind role
        const ownerRole = currentUser.createdRoles.filter(cRole => cRole.id === body.id)
        if (!ownerRole.length && !existSystemRole.length) {
            throw new ValidationException({
                permission: await this.languageService.setError(['permission', 'updateSystemRole']),
            })
        }

        // Check role on system current user role
        if (role.type === ERolesType.system) {
            if (!existSystemRole.length) {
                throw new ValidationException({
                    permission: await this.languageService.setError(['permission', 'updateSystemRole']),
                })
            }
        }

        if (body.role || body.description || body.type) {
            // Check role on existing
            if (body.role !== undefined) {
                const checkExistRole = await this.roles.findOne({ where: { roleKey: string.trimRole(body.role) } })
                if (checkExistRole) {
                    throw new ValidationException({
                        exists: await this.languageService.setError(['isExists', 'role']),
                    })
                }
            }

            role.role = body.role || role.role
            role.description = body.description || role.description

            // Succes to update system role
            if (body.type === ERolesType.system) {
                if (!existSystemRole.length) {
                    throw new ValidationException({
                        permission: await this.languageService.setError(['permission', 'updateSystemRole']),
                    })
                }
                role.type = body.type || role.type
            }
        } else {
            throw new ValidationException({
                role: await this.languageService.setError(['isEmpty', 'all']),
            })
        }

        // Update role
        try {
            const uRole = await this.roles.save(this.roles.create({ ...role }))
            return { ok: Boolean(uRole), role: uRole }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                update: await this.languageService.setError(['isNot', 'updateRole']),
            })
        }
    }

    /**
     * Delete role by id
     * @param body role's id
     * @returns boolean
     */
    async deleteRole({ id }: DeleteRoleInput, context): Promise<DeleteRoleOutput> {
        const dRole = await this.roles.findOne({ where: { id } })
        if (!dRole) {
            throw new ValidationException({ role: await this.languageService.setError(['isNot', 'foundRole']) })
        }

        // Check current user role by existing systems roles
        const currentUser: User = getCurrentUser(context)
        const existSystemRole = currentUser.roles.filter(role => role.role.roleKey === ESystemsRoles.super_admin)

        // Check user, if he owner role or have permisiion to updatind role
        const ownerRole = currentUser.createdRoles.filter(cRole => cRole.id === id)
        if (!ownerRole.length && !existSystemRole.length) {
            throw new ValidationException({
                permission: await this.languageService.setError(['permission', 'updateSystemRole']),
            })
        }
        // Succes to delete system role
        if (dRole.type === ERolesType.system) {
            // Check to see if user has permission to delete role
            if (!existSystemRole.length) {
                throw new ValidationException({
                    permission: await this.languageService.setError(['permission', 'deleteSystemRole']),
                })
            }
        }

        // Delete role
        try {
            const deletedRole = await this.roles.delete(id)
            return { ok: Boolean(deletedRole.affected > 0) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ delete: await this.languageService.setError(['isNot', 'deleteRole']) })
        }
    }

    /**
     * Set user role by user id and role
     * @param body user id, and role
     * @param context for getting currentUser
     * @returns role, user
     * ! NO ALL ALL USERS WITH ADMIN OR DOCTOR CAN SET ROLE
     * TODO USING PERMISSIONS
     */
    async setUserRole(body: SetUserRoleInput, system = false, context?: any): Promise<SetUserRoleOutput> {
        // Check candidat for role
        const candidate = await this.users.findOne({ where: { id: body.userId }, ...relationsConfig.users })
        if (!candidate) {
            throw new ValidationException({
                not_found: await this.languageService.setError(['isNotFound', 'foundUser']),
            })
        }

        let userSetTheRole: User
        if (!system && context) {
            const currentUser: User = getCurrentUser(context)
            userSetTheRole = await this.users.findOne({ where: { id: currentUser.id } })
            if (!userSetTheRole) {
                throw new ValidationException({
                    not_exist: await this.languageService.setError(['isNotExist', 'user'], 'users'),
                })
            }
        }

        const roleKey = string.trimRole(body.role)

        const role = await this.roles.findOne({ where: { roleKey } })
        if (!role) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNotExist', 'role']),
            })
        }

        const userRole = await this.userRoles.save(
            this.userRoles.create({
                role,
                user: candidate,
                setTheRole: !system ? userSetTheRole : null,
                type: ERolesType.system,
            }),
        )

        const user = await this.users.findOne({ where: { id: body.userId }, ...relationsConfig.users })
        return { ok: Boolean(userRole.user.id === body.userId), role, user }
    }

    /**
     * Delete user role by user id and role
     * @param body user id, and role
     * @returns true if deleted
     * ! NO ALL ALL USERS WITH ADMIN OR DOCTOR CAN SET ROLE
     * TODO USING PERMISSIONS
     */
    async deleteUserRole(body: DeleteUserRoleInput): Promise<DeleteUserRoleOutput> {
        const candidate = await this.users.findOne({ where: { id: body.userId }, ...relationsConfig.users })
        if (!candidate && !candidate.roles.length) {
            throw new ValidationException({ not_found: await this.languageService.setError(['isNot', 'foundUser']) })
        }

        // TODO: Check to system or not, if role system user  cant't delete it.
        const roleKey = string.trimRole(body.role)
        const role = candidate.roles.filter(role => role.role.roleKey === roleKey)[0]
        let deletedRole: any

        // Check if the type role is system or not
        if (role.type === ERolesType.system) {
            // Check user role if it super_admin, delete it
            const superAdmin = candidate.roles.filter(role => role.role.roleKey === ESystemsRoles.super_admin)
            if (!superAdmin.length) {
                throw new ValidationException({
                    permission: await this.languageService.setError(['permission', 'deleteSystemRole']),
                })
            }

            try {
                deletedRole = await this.userRoles.delete({ id: role.id })
                return { ok: Boolean(deletedRole.affected > 0) }
            } catch (error) {
                console.log(error)
                throw new ValidationException({
                    delete: await this.languageService.setError(['isNot', 'deleteRole']),
                })
            }
        }
        try {
            deletedRole = await this.userRoles.delete({ id: role.id })
            return { ok: Boolean(deletedRole.affected > 0) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ delete: await this.languageService.setError(['isNot', 'deleteRole']) })
        }
    }

    /**
     * Find all role
     * @returns roles array
     * ! NO ALL ALL USERS WITH ADMIN OR DOCTOR CAN SET ROLE
     * TODO USING PERMISSIONS
     */
    async findAllRoles(): Promise<FindAllRolesOutput> {
        try {
            const roles = await this.roles.find({ ...relationsConfig.roles })
            return { ok: true, roles }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                not_found: await this.languageService.setError(['isNotFound', 'foundRoles']),
            })
        }
    }
}
