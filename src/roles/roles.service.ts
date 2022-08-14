import { object } from 'src/common/helpers'
import { EDefaultRoles } from 'src/roles/roles.enums'
import { ERolesType, ESystemsRoles } from './roles.enums'
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
    constructor(
        @Inject(CONTEXT) private readonly context,
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(UserRoles) private readonly userRoles: Repository<UserRoles>,
        @InjectRepository(Role) private readonly roles: Repository<Role>,
        private readonly languageService: LanguageService,
        private readonly jwt: JwtService,
    ) {}

    /**
     * Create default roles in database.
     * @returns true if create roles or roles are exist in database
     */
    async _deffaultRoles(): Promise<boolean> {
        try {
            /**
             * Check roles on the existing default roles in database
             * @param _deffaultRoles default roles
             * @returns true if created roles, false if all roles exist
             */
            const _checkExistRole = async (_deffaultRoles: object): Promise<boolean> => {
                const roles = await this.roles.find({})

                // Check founded roles exist in the database
                const existedRoles = roles.filter(el => {
                    let role: object
                    for (const key in _deffaultRoles) {
                        if (_deffaultRoles[key] === el.roleKey) {
                            role = el
                        }
                    }
                    return role
                })

                // If roles not exist, return true
                if (!existedRoles.length) {
                    return true
                }
                // Check if created all roles in the database,
                // If not all to create in the database
                if (existedRoles.length !== object.length(_deffaultRoles)) {
                    try {
                        for (const key in _deffaultRoles) {
                            await existedRoles.forEach(async el => {
                                console.log(key, 'key')
                                if (el.role !== key) {
                                    await this.roles.save(
                                        this.roles.create({
                                            role: key,
                                            description: 'Default system role',
                                            type: ERolesType.system,
                                            user: null,
                                        }),
                                    )
                                    return
                                }
                                return
                            })
                        }
                        return false
                    } catch (error) {
                        console.log(error)
                        throw new Error(await this.languageService.setError(['isNot', 'createDefaultRole'], 'roles'))
                    }
                }
                return false
            }

            /**
             * Create default and system roles in database
             * @param _deffaultRoles default roles
             */
            const _createDefaultRoles = async (_deffaultRoles: object): Promise<void> => {
                try {
                    for (const key in _deffaultRoles) {
                        console.log(_deffaultRoles[key])
                        await this.roles.save(
                            this.roles.create({
                                role: key,
                                description: 'Default system role',
                                type: ERolesType.system,
                                user: null,
                            }),
                        )
                    }
                    return
                } catch (error) {
                    console.log(error)
                    throw new Error(await this.languageService.setError(['isNot', 'createDefaultRole'], 'roles'))
                }
            }

            // Check and create no existing default roles in database and create it
            const defaultRoles = await _checkExistRole(EDefaultRoles)
            const systemsRoles = await _checkExistRole(ESystemsRoles)

            if (defaultRoles) {
                await _createDefaultRoles(EDefaultRoles)
            }
            if (systemsRoles) {
                await _createDefaultRoles(ESystemsRoles)
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async createRole(body: CreateRoleInput): Promise<CreateRoleOutput> {
        const checkRole = await this.roles.findOne({ where: { roleKey: string.trimRole(body.role) } })
        if (checkRole)
            throw new ValidationException({
                role: await this.languageService.setError(['isExists', 'role']),
            })

        // Succes to create system role
        if (body.type === ERolesType.system) {
            // Check current user role by existing systems roles
            const currentUser: User = await this.jwt.getContextUser(this.context)
            const existSystemRole = currentUser.roles.filter(role => role.role.roleKey === ESystemsRoles.super_admin)

            if (!existSystemRole.length) {
                throw new ValidationException({
                    role: await this.languageService.setError(['permission', 'createSystemRole']),
                })
            }
        }
        const currentUser: User = await this.jwt.getContextUser(this.context)
        const user = await this.users.findOne({ where: { id: currentUser.id } })
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
                role: await this.languageService.setError(['isNot', 'foundRole']),
            })
        }

        // Check current user role by existing systems roles
        const currentUser: User = await this.jwt.getContextUser(this.context)
        const existSystemRole = currentUser.roles.filter(role => role.role.roleKey === ESystemsRoles.super_admin)

        // Check user, if he owner role or have permisiion to updatind role
        const ownerRole = currentUser.createdRoles.filter(cRole => cRole.id === body.id)
        if (!ownerRole.length && !existSystemRole.length) {
            throw new ValidationException({
                role: await this.languageService.setError(['permission', 'updateSystemRole']),
            })
        }

        // Check role on system current user role
        if (role.type === ERolesType.system) {
            if (!existSystemRole.length) {
                throw new ValidationException({
                    role: await this.languageService.setError(['permission', 'updateSystemRole']),
                })
            }
        }

        if (body.role || body.description || body.type) {
            // Check role on existing
            if (body.role !== undefined) {
                const checkExistRole = await this.roles.findOne({ where: { roleKey: string.trimRole(body.role) } })
                if (checkExistRole) {
                    throw new ValidationException({
                        role: await this.languageService.setError(['isExists', 'role']),
                    })
                }
            }

            role.role = body.role || role.role
            role.description = body.description || role.description

            // Succes to update system role
            if (body.type === ERolesType.system) {
                if (!existSystemRole.length) {
                    throw new ValidationException({
                        role: await this.languageService.setError(['permission', 'updateSystemRole']),
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
        if (!dRole) throw new ValidationException({ role: await this.languageService.setError(['isNot', 'foundRole']) })

        // Check current user role by existing systems roles
        const currentUser: User = await this.jwt.getContextUser(this.context)
        const existSystemRole = currentUser.roles.filter(role => role.role.roleKey === ESystemsRoles.super_admin)

        // Check user, if he owner role or have permisiion to updatind role
        const ownerRole = currentUser.createdRoles.filter(cRole => cRole.id === id)
        if (!ownerRole.length && !existSystemRole.length) {
            throw new ValidationException({
                role: await this.languageService.setError(['permission', 'updateSystemRole']),
            })
        }
        // Succes to delete system role
        if (dRole.type === ERolesType.system) {
            // Check to see if user has permission to delete role
            if (!existSystemRole.length) {
                throw new ValidationException({
                    role: await this.languageService.setError(['permission', 'deleteSystemRole']),
                })
            }
        }

        // Delete role
        try {
            // await this.roles.delete(id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ role: await this.languageService.setError(['isNot', 'deleteRole']) })
        }
    }

    /*
        ! NO ALL ALL USERS WITH ADMIN OR DOCTOR CAN SET ROLE
        TODO USING PERMISSIONS
    */
    async setUserRole(body: SetUserRoleInput, system = false): Promise<SetUserRoleOutput> {
        // Check candidat for role
        const candidate = await this.users.findOne({ where: { id: body.userId }, ...relationsConfig.users })
        if (!candidate)
            throw new ValidationException({
                user: await this.languageService.setError(['isNotFound', 'foundUser']),
            })

        let userSetTheRole: User
        if (!system) {
            const currentUser: User = await this.jwt.getContextUser(this.context)
            userSetTheRole = await this.users.findOne({ where: { id: currentUser.id } })
            if (!userSetTheRole) {
                throw new ForbiddenException({
                    auth: await this.languageService.setError(['isNotAuth', 'auth']),
                })
            }
        }

        const roleKey = string.trimRole(body.role)

        const role = await this.roles.findOne({ where: { roleKey } })
        if (!role)
            throw new ValidationException({
                roles: await this.languageService.setError(['isNotExist', 'role']),
            })

        await this.userRoles.save(
            this.userRoles.create({ role, user: candidate, setTheRole: !system ? userSetTheRole : null }),
        )

        const user = await this.users.findOne({ where: { id: body.userId }, ...relationsConfig.users })
        return { ok: true, role, user }
    }

    /*
        ! NO ALL ALL USERS WITH ADMIN OR DOCTOR CAN SET ROLE
        TODO USING PERMISSIONS
    */
    async deleteUserRole(body: DeleteUserRoleInput): Promise<DeleteUserRoleOutput> {
        const candidate = await this.users.findOne({ where: { id: body.userId }, ...relationsConfig.users })
        if (!candidate) {
            throw new ValidationException({ error: await this.languageService.setError(['isNot', 'foundUser']) })
        }

        if (!candidate.roles.length) {
            throw new ValidationException({ error: await this.languageService.setError(['isNot', 'foundRole']) })
        }

        try {
            const roleKey = string.trimRole(body.role)
            const role = candidate.roles.filter(role => role.role.roleKey === roleKey)[0]

            await this.userRoles.delete({ id: role.id })
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({ error: await this.languageService.setError(['isNot', 'deleteRole']) })
        }
    }

    async findAllRoles(): Promise<FindAllRolesOutput> {
        // ! TEST this test function
        // this._deffaultRoles()
        // ! TEST END this test function
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
