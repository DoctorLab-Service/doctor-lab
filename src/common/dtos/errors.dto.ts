import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Errors {
    [key: string]: string
}
