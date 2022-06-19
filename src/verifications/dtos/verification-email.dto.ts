import { CoreOutput } from 'src/common/dtos/output.dto'
import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { VerificationEmail } from 'src/verifications/entities/verification-email.entiry'

@InputType()
export class VerificationEmailInput extends PickType(VerificationEmail, ['code']) {}

@ObjectType()
export class VerificationEmailOutput extends CoreOutput {}
