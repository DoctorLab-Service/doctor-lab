import { CoreOutput } from 'src/common/dtos/output.dto'
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { User } from 'src/users/entities'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class ChangePhoneInput extends PickType(User, ['phone']) {}

@InputType()
export class ChangeEmailInput extends PickType(User, ['email']) {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    reEmail: string
}

@InputType()
export class ChangePasswordInput extends PickType(User, ['password']) {
    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    rePassword: string
}

@ObjectType()
export class ChangeOutput extends CoreOutput {}
