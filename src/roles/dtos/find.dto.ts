import { Field, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { Role } from '../entities/role.entity'
/*
    Outputs
*/
@ObjectType()
export class FindAllRolesOutput extends CoreOutput {
    @Field(() => [Role], { nullable: true })
    roles?: Role[]
}
