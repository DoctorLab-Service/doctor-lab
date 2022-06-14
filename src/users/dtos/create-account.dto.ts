import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { User } from '../entities/user.entity'

@InputType()
export class CreateAccountInput extends PickType(User, [
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
]) {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    rePassword?: string
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    token?: string
}
