import { CoreOutput } from 'src/common/dtos/output.dto'
import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { VerifyPhone } from 'src/verifications/entities/verify-phone.entity'

@InputType()
export class VerifyPhoneInput extends PickType(VerifyPhone, ['code']) {}

@ObjectType()
export class VerifyPhoneOutput extends CoreOutput {}
