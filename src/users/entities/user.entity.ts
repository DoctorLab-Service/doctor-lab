import { UserPatient } from './../users.enums'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsString } from 'class-validator'
import { CoteEntity } from 'src/common/entities/core.entity'
import { Column, Entity } from 'typeorm'
import { UserAdminSuccess, UserClinicAccess, UserGender, UserRoles } from '../users.enums'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Users extends CoteEntity {
    @Column()
    @Field(() => String)
    @IsString()
    fullname: string

    @Column()
    @Field(() => String)
    @IsString()
    country: string

    @Column()
    @Field(() => String)
    @IsString()
    state: string

    @Column({ unique: true })
    @Field(() => String)
    @IsString()
    address: string

    @Column()
    @Field(() => String)
    @IsString()
    phone: string

    @Column({ unique: true })
    @Field(() => String)
    @IsString()
    email: string

    @Column()
    @Field(() => String)
    @IsString()
    password: string

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    verifiedPhone: boolean // false

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    verifiedEmail: boolean // false

    @Column({ type: 'enum', enum: UserGender })
    @Field(() => UserGender)
    gender: UserGender

    @Column({ type: 'enum', enum: UserClinicAccess || UserAdminSuccess || UserPatient })
    @Field(() => UserClinicAccess || UserAdminSuccess || UserPatient)
    success: UserClinicAccess | UserAdminSuccess | UserPatient

    @Column({ type: 'enum', enum: UserRoles })
    @Field(() => UserRoles)
    role: UserRoles

    //messages: Messages
    //clinics: Clinic[] // Pat
    //doctors: User[success='Doctor'][]//Pat, with dent
    //patients: User[success='Patient'][] // Dr/pat
    //treatments: Treatment[] // Dr/pat
    //appointments: Appointment[] // Dr/pat
    //payments: Payments
    //rate: Ratings
    //clinic: Clinic | null // for owner
}
