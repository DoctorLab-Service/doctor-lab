import { CoreOutput } from 'src/common/dtos/output.dto'
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { User } from 'src/users/entities/user.entity'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class ChangeEmailInput extends PickType(User, ['email']) {}
@InputType()
export class ChangePhoneInput extends PickType(User, ['phone']) {}
@InputType()
export class ChangePasswordInput extends PickType(User, ['password']) {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    rePassword?: string
}

@ObjectType()
export class ChangeOutput extends CoreOutput {}
