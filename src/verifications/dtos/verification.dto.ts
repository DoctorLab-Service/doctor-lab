import { CoreOutput } from 'src/common/dtos/output.dto'
import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType()
export class VerificationInput {
    @Field(() => String)
    code: string
}

@ObjectType()
export class VerificationOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    token?: string
}
