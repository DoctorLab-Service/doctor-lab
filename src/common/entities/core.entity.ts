import { ObjectType, Field } from '@nestjs/graphql'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@ObjectType()
export class CoreEntity {
    @PrimaryGeneratedColumn()
    @Field(() => Number)
    id: number

    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date

    @UpdateDateColumn()
    @Field(() => Date)
    updatedAt: Date

    @VersionColumn()
    @Field(() => Number)
    _v: number
}
