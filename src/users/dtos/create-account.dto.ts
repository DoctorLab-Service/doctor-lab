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
import { User } from '../entities/user.entity'
import { IsNotEmpty, IsString } from 'class-validator'

registerEnumType(EDefaultRoles, { name: 'EDefaultRoles' })

@InputType()
export class NoRequiredInput extends PartialType(PickType(User, ['gender', 'facebookId', 'googleId'])) {}
@InputType()
export class RequiredInput extends PickType(User, [
    'fullname',
    'country',
    'state',
    'address',
    'experience',
    'phone',
    'email',
    'password',
    'language',
]) {}

@InputType()
export class CreateAccountInput extends IntersectionType(RequiredInput, NoRequiredInput) {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    rePassword?: string

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
