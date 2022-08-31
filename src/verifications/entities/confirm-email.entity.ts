import { v4 as uuidv4 } from 'uuid'
import { BeforeInsert, Column, Entity } from 'typeorm'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsEmail, IsString, Length } from 'class-validator'
import { CoreEntity } from 'src/common/entities'
import { EConfirmCodeKey } from '../verifications.enums'

registerEnumType(EConfirmCodeKey, { name: 'EConfirmCodeKey' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class ConfirmEmail extends CoreEntity {
    @Column()
    @Field(() => String)
    @IsString()
    code: string

    @Column()
    @Field(() => String)
    @IsEmail()
    @Length(4, 64)
    email: string

    @Column({ type: 'enum', enum: EConfirmCodeKey, nullable: true })
    key: EConfirmCodeKey

    @BeforeInsert()
    createCode(): void {
        this.code = uuidv4()
    }
}
