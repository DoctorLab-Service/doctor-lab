import { CoreOutput } from 'src/common/dtos/output.dto'
import { Field, InputType, IntersectionType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'
import { IsNotEmpty, IsString, Length } from 'class-validator'

@InputType()
export class NoRequiredInput extends PartialType(PickType(User, ['facebookId', 'googleId'])) {}
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

    @Field(() => String)
    @Length(4, 32)
    role: string
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    accessToken?: string

    refreshToken?: string

    @Field(() => User, { nullable: true })
    user?: User
}
