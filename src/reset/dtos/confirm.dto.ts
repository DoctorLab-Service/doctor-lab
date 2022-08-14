import { CoreOutput } from 'src/common/dtos/output.dto'
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'

/*
    Inputs
*/
@InputType()
export class ConfirmPasswordInput {
    @Field(() => Boolean, { defaultValue: false })
    email: boolean

    @Field(() => Boolean, { defaultValue: false })
    phone: boolean

    @Field(() => String)
    code: string
}

@InputType()
export class ConfirmEmailCodeInput extends PickType(User, ['email']) {}

@InputType()
export class ConfirmPhoneCodeInput extends PickType(User, ['phone']) {}

/*
    Outputs
*/

@ObjectType()
export class ConfirmOutput extends CoreOutput {}

@ObjectType()
export class ConfirmCodeOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    code?: string
}
