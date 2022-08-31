import { Role } from 'src/roles/entities'
import { Field, InputType, IntersectionType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'

@InputType()
export class RequiredInput extends PartialType(PickType(Role, ['type'])) {}
@InputType()
export class NoRequiredInput extends PickType(Role, ['role', 'description']) {}
@InputType()
export class CreateRoleInput extends IntersectionType(RequiredInput, NoRequiredInput) {}

@ObjectType()
export class CreateRoleOutput extends CoreOutput {
    @Field(() => Role, { nullable: true })
    role?: Role
}
