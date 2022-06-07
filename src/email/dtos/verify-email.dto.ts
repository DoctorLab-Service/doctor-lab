import { CoreOutput } from 'src/common/dtos/output.dto'
import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { VerifyEmail } from 'src/users/entities/verify-email.entity'

@InputType()
export class VerifyEmailInput extends PickType(VerifyEmail, ['code']) {}

@ObjectType()
export class VerifyEmailOutput extends CoreOutput {}
