import { EDefaultRoles } from 'src/roles/roles.enums'
import { CoreOutput } from 'src/common/dtos/output.dto'
import {
    Field,
    InputType,
    IntersectionType,
    ObjectType,
    PartialType,
    PickType,
    registerEnumType,
} from '@nestjs/graphql'
import { User } from '../entities'
import { IsNotEmpty, IsString } from 'class-validator'

registerEnumType(EDefaultRoles, { name: 'EDefaultRoles' })

@InputType()
export class NoRequiredInput extends PartialType(
    PickType(User, ['gender', 'facebookId', 'googleId', 'language', 'country', 'state', 'address', 'experience']),
) {}
@InputType()
export class RequiredInput extends PickType(User, ['fullname', 'phone', 'email', 'password']) {}

@InputType()
export class CreateAccountInput extends IntersectionType(RequiredInput, NoRequiredInput) {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    rePassword: string

    @Field(() => EDefaultRoles)
    role: EDefaultRoles
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    accessToken?: string

    refreshToken?: string

    @Field(() => User, { nullable: true })
    user?: User
}
