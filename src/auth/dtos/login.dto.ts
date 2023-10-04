import { Field, InputType, IntersectionType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { EDefaultRoles } from 'src/roles/roles.enums'
import { User } from 'src/users/entities'

@InputType()
export class NoRequiredInput extends PartialType(PickType(User, ['phone', 'email'])) {}

@InputType()
export class RequiredInput extends PickType(User, ['password']) {}

@InputType()
export class LoginInput extends IntersectionType(RequiredInput, NoRequiredInput) {
    @Field(() => EDefaultRoles)
    role: EDefaultRoles
}

@ObjectType()
export class LoginOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    accessToken?: string

    refreshToken?: string

    @Field(() => User, { nullable: true })
    user?: User
}
