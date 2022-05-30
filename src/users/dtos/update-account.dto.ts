import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { User } from '../entities/user.entity'

@InputType()
export class UpdateAccountInput extends PartialType(
    PickType(User, [
        'fullname',
        'birthdate',
        'country',
        'state',
        'address',
        'experience',
        'phone',
        'email',
        'password',
        'language',
    ]),
) {}

@ObjectType()
export class UpdateAccountOutput extends CoreOutput {}
