import { CoreOutput } from 'src/common/dtos/output.dto'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@ObjectType()
export class MyAccountOutput extends CoreOutput {
    @Field(() => User, { nullable: true })
    user?: User
}
