import { EUserRoles } from 'src/common/common.enums'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'

@InputType()
export class AddRoleInput {
    @Field(() => EUserRoles)
    role: EUserRoles
}

@ObjectType()
export class AddRoleOutput extends CoreOutput {
    @Field(() => EUserRoles)
    role?: EUserRoles
}
