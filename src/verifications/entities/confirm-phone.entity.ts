import { BeforeInsert, Column, Entity } from 'typeorm'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsPhoneNumber, IsString } from 'class-validator'
import { InternalServerErrorException } from '@nestjs/common'
import { CoreEntity } from 'src/common/entities'
import { EConfirmCodeKey } from '../verifications.enums'

registerEnumType(EConfirmCodeKey, { name: 'EConfirmCodeKey' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class ConfirmPhone extends CoreEntity {
    @Column()
    @Field(() => String)
    @IsString()
    code: string

    @Column()
    @Field(() => String)
    @IsPhoneNumber()
    phone: string

    @Column({ type: 'enum', enum: EConfirmCodeKey, nullable: true })
    key: EConfirmCodeKey

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
