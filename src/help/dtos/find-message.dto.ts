import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { HelpMessage } from '../entities'

/*
    Inputs
*/
@InputType()
export class FindHelpMessageByIdInput extends PickType(HelpMessage, ['id']) {}

/*
    Outputs
*/
@ObjectType()
export class FindAllHelpMessagesOutput extends CoreOutput {
    @Field(() => [HelpMessage], { defaultValue: [] })
    messages?: HelpMessage[]
}
@ObjectType()
export class FindHelpMessageByIdOutput extends CoreOutput {
    @Field(() => HelpMessage, { nullable: true })
    message?: HelpMessage
}
