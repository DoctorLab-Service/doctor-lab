import { CoreOutput } from 'src/common/dtos/output.dto'
import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@InputType()
export class UpdateAccountInput extends PartialType(
    PickType(User, [
        'avatar',
        'fullname',
        'birthdate',
        'country',
        'gender',
        'state',
        'address',
        'experience',
        'language',
    ]),
) {}

@ObjectType()
export class UpdateAccountOutput extends CoreOutput {
    @Field(() => User, { nullable: true })
    user?: User
}
