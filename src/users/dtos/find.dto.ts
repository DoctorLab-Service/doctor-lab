import { InputType, Field, PickType, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from './../../common/dtos/output.dto'
import { User } from '../entities/user.entity'

/*
    Inputs
*/
@InputType()
export class FindByIdInput extends PickType(User, ['id', 'language']) {}

@InputType()
export class FindByPhoneInput extends PickType(User, ['phone', 'language']) {}

@InputType()
export class FindByEmailInput extends PickType(User, ['email', 'language']) {}

@InputType()
export class FindAllByRoleInput extends PickType(User, ['role', 'language']) {}

@InputType()
export class FindAllInput extends PickType(User, ['language']) {}

/*
    Outputs
*/
@ObjectType()
export class FindByOutput extends CoreOutput {
    @Field(() => User, { nullable: true })
    user?: User
}

@ObjectType()
export class FindAllOutput extends CoreOutput {
    @Field(() => [User], { nullable: true })
    users?: User[]
}
