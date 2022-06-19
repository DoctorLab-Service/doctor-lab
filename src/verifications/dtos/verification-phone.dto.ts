import { CoreOutput } from 'src/common/dtos/output.dto'
import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { VerificationPhone } from '../entities/verification-phone.entiry'

@InputType()
export class VerificationPhoneInput extends PickType(VerificationPhone, ['code']) {}

@ObjectType()
export class VerificationPhoneOutput extends CoreOutput {}
