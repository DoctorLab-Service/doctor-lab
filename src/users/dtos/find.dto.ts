import { InputType, Field, PickType, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from './../../common/dtos/output.dto'
import { User } from '../entities/user.entity'

// class FindById extends PickType(User, ['id']) {}
// class FindByPhone extends PickType(User, ['phone']) {}
// class FindByEmail extends PickType(User, ['email']) {}

// @InputType()
// export class FindByIdInput extends PickType(User, ['language']) {
//     @Field(() => Number || String)
//     query: FindById | FindByPhone | FindByEmail
// }

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
export class FindAllByRoleIenput extends PickType(User, ['role', 'language']) {}

/*
    Outputs
*/
@ObjectType()
export class FindByOutput extends CoreOutput {
    @Field(() => User, { nullable: true })
    user?: User
}

@ObjectType()
export class FindAllByOutput extends CoreOutput {
    @Field(() => [User], { nullable: true })
    users?: User[]
}
