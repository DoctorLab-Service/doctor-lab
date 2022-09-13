import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { HelpMessage } from '../entities'

@InputType()
export class CloseHelpMessageInput extends PickType(HelpMessage, ['id']) {}

@ObjectType()
export class CloseHelpMessageOutput extends CoreOutput {
    @Field(() => HelpMessage, { nullable: true })
    message?: HelpMessage
}
