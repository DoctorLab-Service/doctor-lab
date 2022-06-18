import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'

@InputType()
export class LogoutInput {
    @Field(() => String)
    refreshToken: string
}

@ObjectType()
export class LogoutOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    refreshToken?: string
}
