import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { HelpMessage } from '../entities'

@InputType()
export class ReadHelpMessageInput extends PickType(HelpMessage, ['id']) {}

@ObjectType()
export class ReadHelpMessageOutput extends CoreOutput {
    @Field(() => HelpMessage, { nullable: true })
    message?: HelpMessage
}
