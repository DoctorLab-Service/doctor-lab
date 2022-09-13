import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { HelpAnswer, HelpMessage } from '../entities'

@InputType()
export class AnswerToHelpMessageInput extends PickType(HelpMessage, ['id', 'title', 'text']) {}

@ObjectType()
export class AnswerToHelpMessageOutput extends CoreOutput {
    @Field(() => HelpAnswer, { nullable: true })
    message: HelpAnswer
}
