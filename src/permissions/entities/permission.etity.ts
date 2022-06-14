import { InputType, ObjectType } from '@nestjs/graphql'
import { Entity } from 'typeorm'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Permission {}
