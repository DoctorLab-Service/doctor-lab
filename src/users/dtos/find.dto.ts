import { InputType, Field, PickType, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { User } from '../entities/user.entity'

/*
    Inputs
*/
@InputType()
export class FindByIdInput extends PickType(User, ['id']) {}

@InputType()
export class FindByPhoneInput extends PickType(User, ['phone']) {}

@InputType()
export class FindByEmailInput extends PickType(User, ['email']) {}

// @InputType()
// export class FindAllByRoleInput extends PickType(User, ['role']) {}

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
