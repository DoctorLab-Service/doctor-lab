import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { Role } from '../entities/role.entity'
import { User } from 'src/users/entities/user.entity'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { IsNumber } from 'class-validator'

@InputType()
export class SetUserRoleInput extends PickType(Role, ['role']) {
    @Field(() => Number)
    @IsNumber()
    userId: number
}

@ObjectType()
export class SetUserRoleOutput extends CoreOutput {
    @Field(() => User, { nullable: true })
    user?: User

    @Field(() => Role, { nullable: true })
    role?: Role
}
