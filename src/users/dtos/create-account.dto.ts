import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { User } from '../entities/user.entity'

export const CreateAccountFields: any[] = [
    'fullname',
    'country',
    'state',
    'address',
    'experience',
    'phone',
    'email',
    'password',
    'language',
]

@InputType()
export class CreateAccountInput extends PickType(User, [...CreateAccountFields, 'success', 'role', 'language']) {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsNotEmpty()
    rePassword?: string
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
