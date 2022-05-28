import { Field, ObjectType } from '@nestjs/graphql'
// import { Errors } from './errors.dto'

@ObjectType()
export class CoreOutput {
    // @Field(() => String, { nullable: true })
    // error?: string | Errors

    @Field(() => Boolean)
    ok?: boolean
}
