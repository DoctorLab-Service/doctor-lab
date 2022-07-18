import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Role } from '../entities/role.entity'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { IsNumber } from 'class-validator'

@InputType()
export class DeleteUserRoleInput extends PickType(Role, ['role']) {
    @Field(() => Number)
    @IsNumber()
    userId: number
}

@ObjectType()
export class DeleteUserRoleOutput extends CoreOutput {}
