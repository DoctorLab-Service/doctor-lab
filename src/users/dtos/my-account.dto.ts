import { CoreOutput } from 'src/common/dtos/output.dto'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../entities'

@ObjectType()
export class MyAccountOutput extends CoreOutput {
    @Field(() => User, { nullable: true })
    user?: User
}
