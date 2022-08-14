import { CoreOutput } from 'src/common/dtos/output.dto'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ResetOutput extends CoreOutput {}
