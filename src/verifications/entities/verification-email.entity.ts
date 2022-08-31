import { v4 as uuidv4 } from 'uuid'
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { CoreEntity } from 'src/common/entities'
import { User } from 'src/users/entities'
import { EVerificationCodeKey } from '../verifications.enums'

registerEnumType(EVerificationCodeKey, { name: 'EVerificationCodeKey' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class VerificationEmail extends CoreEntity {
    @Column({ unique: true })
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
