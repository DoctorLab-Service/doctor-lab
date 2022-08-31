import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsString } from 'class-validator'
import { InternalServerErrorException } from '@nestjs/common'
import { CoreEntity } from 'src/common/entities'
import { User } from 'src/users/entities'
import { EVerificationCodeKey } from '../verifications.enums'

registerEnumType(EVerificationCodeKey, { name: 'EVerificationCodeKey' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class VerificationPhone extends CoreEntity {
    @Column({ unique: true })
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
