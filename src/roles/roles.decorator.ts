import { SetMetadata } from '@nestjs/common'
import { EUserRoles } from 'src/common/common.enums'

export const ROLES_KEY = 'roles'
export const Roles = (...roles: EUserRoles[]) => SetMetadata(ROLES_KEY, roles)
