import { CoreOutput } from 'src/common/dtos/output.dto'
import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@InputType()
export class UpdateAccountInput extends PartialType(
    PickType(User, ['fullname', 'country', 'state', 'address', 'experience', 'phone', 'email', 'password', 'language']),
) {}

@ObjectType()
export class UpdateAccountOutput extends CoreOutput {}
