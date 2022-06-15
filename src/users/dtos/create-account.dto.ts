import { CoreOutput } from 'src/common/dtos/output.dto'
import { Field, InputType, IntersectionType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

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
    'role',
    'language',
]) {}

@InputType()
export class CreateAccountInput extends IntersectionType(RequiredInput, NoRequiredInput) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    token?: string
}
