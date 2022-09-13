import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { HelpMessage } from '../entities'

@InputType()
export class DeleteHelpMessageInput extends PickType(HelpMessage, ['id']) {}

@ObjectType()
export class DeleteHelpMessageOutput extends CoreOutput {}
