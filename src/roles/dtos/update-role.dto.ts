import { Role } from 'src/roles/entities/role.entity'
import { Field, InputType, IntersectionType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { IsString, Length } from 'class-validator'

@InputType()
export class RequiredInput extends PartialType(PickType(Role, ['system', 'description'])) {}
@InputType()
export class NoRequiredInput extends PickType(Role, ['role']) {
    @Field(() => String, { nullable: true, description: 'Update name role' })
    @IsString()
    @Length(4, 64)
    roleName?: string
}
@InputType()
export class UpdateRoleInput extends IntersectionType(RequiredInput, NoRequiredInput) {}

@ObjectType()
export class UpdateRoleOutput extends CoreOutput {
    @Field(() => Role, { nullable: true })
    role?: Role
}
