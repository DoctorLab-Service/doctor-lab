import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from 'src/common/dtos/output.dto'
import { User } from 'src/users/entities'

@InputType()
export class DeleteFilesInput extends PickType(User, ['id']) {}
@ObjectType()
export class DeleteFilesOutput extends CoreOutput {}
