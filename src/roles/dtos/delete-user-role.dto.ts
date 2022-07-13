import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Role } from '../entities/role.entity'
import { CoreOutput } from 'src/common/dtos/output.dto'

@InputType()
export class DeleteUserRoleInput extends PickType(Role, ['role', 'user']) {}

@ObjectType()
export class DeleteUserRoleOutput extends CoreOutput {}
