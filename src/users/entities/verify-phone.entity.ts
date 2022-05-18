import { CoteEntity } from 'src/common/entities/core.entity'
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { User } from './user.entity'
import { InternalServerErrorException } from '@nestjs/common'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class VerifyPhone extends CoteEntity {
    @Column()
    @Field(() => String)
    @IsString()
    code: string

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    @BeforeInsert()
    createCode(): number {
        try {
            let code = Math.floor(Math.random() * 999999)
            if (code < 100000) {
                while (code <= 100000) {
                    code = Math.floor(Math.random() * 999999)
                }
            }
            return code
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
    }
}
