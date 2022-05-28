import { CoreOutput } from './../../common/dtos/output.dto'
import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@InputType()
export class FindByIdInput extends PickType(User, ['id']) {}

@ObjectType()
export class FindByIdOutput extends CoreOutput {}
