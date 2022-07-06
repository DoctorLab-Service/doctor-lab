import { Inject, Injectable } from '@nestjs/common'
import { CONTEXT } from '@nestjs/graphql'
import { InjectRepository } from '@nestjs/typeorm'
import { ForbidenException } from 'src/exceptions/forbiden.exception'
import { ValidationException } from 'src/exceptions/validation.exception'
import { Messages } from 'src/language/dtos/notify.dto'
import { LanguageService } from 'src/language/language.service'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateRoleInput, CreateRoleOutput } from './dtos/create-role.dto'
import { DeleteRoleInput, DeleteRoleOutput } from './dtos/delete-role.dto'
import { UpdateRoleInput, UpdateRoleOutput } from './dtos/update-role.dto'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService {
    user: User
    errors: Messages | Record<string, any>
    errorsExist: boolean
    constructor(
        @Inject(CONTEXT) private readonly context,
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Role) private readonly roles: Repository<Role>,
        private readonly languageService: LanguageService,
    ) {
        this.languageService.errors(['users', 'auth', 'roles']).then(errors => {
            this.errors = errors
            this.errorsExist = JSON.stringify(errors) !== '{}'

            if (this.context && this.context.req) {
                if ('user' in this.context.req) {
                    this.user = this.context.req.user
                } else {
                    throw new ForbidenException({
                        auth: this.errorsExist ? errors.auth.isNotAuth.auth : 'User is not authorized',
                    })
                }
            }
        })
    }
    async createRole(body: CreateRoleInput): Promise<CreateRoleOutput> {
        const checkRole = await this.roles.findOne({ where: { role: body.role } })
        if (checkRole)
            throw new ValidationException({
                role: this.errorsExist ? this.errors.roles.isExist.role : 'Role already exists',
            })
        /**
         * TODO: Add chack  to User role for create system role
         */
        try {
            const user = await this.users.findOne({ where: { id: this.user.id } })

            // Create new role
            const role = await this.roles.save(this.roles.create({ ...body, user }))

            return { ok: true, role }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                role: this.errorsExist ? this.errors.roles.isNot.createRole : "Couldn't create role",
            })
        }
    }

    async updateRole(body: UpdateRoleInput): Promise<UpdateRoleOutput> {
        const uRole = await this.roles.findOne({ where: { role: body.role } })
        if (!uRole)
            throw new ValidationException({
                role: this.errorsExist ? this.errors.roles.isNotFound.role : 'The role is not found',
            })
        return { ok: true }
    }

    async deleteRole(body: DeleteRoleInput): Promise<DeleteRoleOutput> {
        const dRole = await this.roles.findOne({ where: { id: body.id } })
        if (!dRole)
            throw new ValidationException({
                role: this.errorsExist ? this.errors.roles.isNotFound.role : 'The role is not found',
            })
        try {
            await this.roles.delete(body.id)
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                role: this.errorsExist ? this.errors.roles.isNot.deleteRole : "Couldn't delete role",
            })
        }
    }
}
