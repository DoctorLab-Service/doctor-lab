import { NotifiesService } from 'src/notifies/notifies.service';
import { ValidationException } from './../exceptions/validation.exception'
import { AddRoleInput, AddRoleOutput } from './dtos/add-role.dto'
import { DeleteRoleInput, DeleteRoleOutput } from './dtos/delete-role.dto'
import { UpdateRoleInput, UpdateRoleOutput } from './dtos/update-role.dto'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { Repository } from 'typeorm'
@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private readonly roles: Repository<Role>,
        private readonly notifiesService: NotifiesService,
    ) {}

    async addRole(body: AddRoleInput): Promise<AddRoleOutput> {
        this.notifiesService.init(null, 'users')
        const errorsCreate = await this.notifiesService.notify('error', 'isNotCreate')
        try {
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException(error)
        }
    }
    async updateRole(body: UpdateRoleInput): Promise<UpdateRoleOutput> {
        // this.notifiesService.init(language, 'users')
        // const errorsCreate = await this.notifiesService.notify('error', 'isNotCreate')
        try {
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException(error)
        }
    }
    async deleteRole(body: DeleteRoleInput): Promise<DeleteRoleOutput> {
        // this.notifiesService.init(language, 'users')
        // const errorsCreate = await this.notifiesService.notify('error', 'isNotCreate')
        try {
            return { ok: true }
        } catch (error) {
            console.log(error)
            throw new ValidationException(error)
        }
    }
}

