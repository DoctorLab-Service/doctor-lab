import { ObjectType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'

@ObjectType()
export class DeleteAccountOutput extends CoreOutput {}
