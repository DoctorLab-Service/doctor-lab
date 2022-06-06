import { CoreEntity } from 'src/common/entities/core.entity'
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { User } from './user.entity'
import { InternalServerErrorException } from '@nestjs/common'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class VerifyPhone extends CoreEntity {
    @Column()
    @Field(() => String)
    @IsString()
    code: string

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    @BeforeInsert()
    createCode(): void {
        try {
            let code = Math.floor(Math.random() * 999999)
            if (code < 100000) {
                while (code <= 100000) {
                    code = Math.floor(Math.random() * 999999)
                }
            }

            this.code = code.toString()
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
    }
}
