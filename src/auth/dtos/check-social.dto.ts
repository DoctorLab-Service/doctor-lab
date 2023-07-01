import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { User } from 'src/users/entities'

@InputType()
export class CheckSocialInput {
    @Field(() => String)
    id: string

    @Field(() => String)
    provider: string
}

@ObjectType()
export class CheckSocialOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    accessToken?: string

    refreshToken?: string

    @Field(() => User, { nullable: true })
    user?: User
}
