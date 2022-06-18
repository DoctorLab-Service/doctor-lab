import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { User } from 'src/users/entities/user.entity'

@InputType()
export class RefreshTokenInput {
    @Field(() => String)
    refreshToken: string
}

@ObjectType()
export class RefreshTokenOutput extends CoreOutput {
    @Field(() => String, { nullable: true })
    token?: string

    @Field(() => User, { nullable: true })
    user?: User
}
