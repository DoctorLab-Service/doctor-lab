import { Field, ObjectType } from '@nestjs/graphql'

type TErrors = {
    [key: string]: string
}
@ObjectType()
export class CoreOutput {
    @Field(() => String, { nullable: true })
    error?: string | TErrors[]

    @Field(() => Boolean)
    ok?: boolean
}
