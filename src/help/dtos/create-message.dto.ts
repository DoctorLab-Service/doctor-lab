import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { HelpMessage } from '../entities'

@InputType()
export class CreateHelpMessageInput extends PickType(HelpMessage, ['fullname', 'email', 'title', 'text']) {}

@ObjectType()
export class CreateHelpMessageOutput extends CoreOutput {
    @Field(() => HelpMessage, { nullable: true })
    message?: HelpMessage
}
