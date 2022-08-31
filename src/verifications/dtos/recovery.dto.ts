import { CoreOutput } from 'src/common/dtos/output.dto'
import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql'
import { User } from 'src/users/entities'

@InputType()
export class PasswordRecoveryCodeInput extends PartialType(PickType(User, ['email', 'phone'])) {}

@ObjectType()
export class RecoveryOutput extends CoreOutput {}
