import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { User } from '../entities/user.entity'

@InputType()
export class CreateAccountInput extends PartialType(
    PickType(User, [
        'fullname',
        'country',
        'state',
        'address',
        'experience',
        'phone',
        'email',
        'password',
        'success',
        'role',
        'language',
    ]),
) {
    @Field(() => String, { nullable: true })
    rePassword?: string
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
