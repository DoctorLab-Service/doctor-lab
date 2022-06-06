import { User } from './../../users/entities/user.entity'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { CoreEntity } from 'src/common/entities/core.entity'
import { Column, Entity, ManyToOne } from 'typeorm'
import { EUserRoles, EUserSuccess } from 'src/common/common.enums'
import { Clinic } from 'src/clinics/entities/clinic.entity'
import { IsBoolean, Length } from 'class-validator'

registerEnumType(EUserRoles, { name: 'EUserRoles' })
registerEnumType(EUserSuccess, { name: 'EUserSuccess' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Role extends CoreEntity {
    @Column()
    @Field(() => String)
    @Length(4, 24)
    role: string

    @Column({ nullable: true })
    @Field(() => String)
    @Length(4, 256)
    description: string

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    default: boolean

    @ManyToOne(() => User, user => user.roles)
    @Field(() => User)
    user: User

    @ManyToOne(() => Clinic, clinic => clinic.roles)
    @Field(() => Clinic)
    clinic: Clinic
}
