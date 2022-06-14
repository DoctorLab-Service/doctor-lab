import { v4 as uuidv4 } from 'uuid'
import { CoreEntity } from 'src/common/entities/core.entity'
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { User } from 'src/users/entities/user.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class VerifyEmail extends CoreEntity {
    @Column()
    @Field(() => String)
    @IsString()
    code: string

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    @BeforeInsert()
    createCode(): void {
        this.code = uuidv4()
    }
}
