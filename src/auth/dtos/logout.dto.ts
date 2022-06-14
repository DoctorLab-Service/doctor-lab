import { Field, InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { User } from 'src/users/entities/user.entity'

@InputType()
export class LogoutInput extends PartialType(PickType(User, ['email', 'phone', 'password'])) {}

@ObjectType()
export class LogoutOutput extends CoreOutput {}
