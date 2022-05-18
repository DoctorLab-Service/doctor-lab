import * as bcrypt from 'bcrypt'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsBoolean, IsString } from 'class-validator'
import { CoteEntity } from 'src/common/entities/core.entity'
import { Column, Entity } from 'typeorm'
import {
    ELanguage,
    EUserPatient,
    EUserAdminSuccess,
    EUserClinicAccess,
    EUserGender,
    EUserRoles,
} from 'src/common/common.enums'
import { InternalServerErrorException } from '@nestjs/common'

registerEnumType(ELanguage, { name: 'ELanguage' })
registerEnumType(EUserPatient, { name: 'EUserPatient' })
registerEnumType(EUserAdminSuccess, { name: 'EUserAdminSuccess' })
registerEnumType(EUserClinicAccess, { name: 'EUserClinicAccess' })
registerEnumType(EUserGender, { name: 'EUserGender' })
registerEnumType(EUserRoles, { name: 'EUserRoles' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoteEntity {
    @Column()
    @Field(() => String)
    @IsString()
    fullname: string

    @Column({ nullable: true })
    @Field(() => String)
    @IsString()
    country: string

    @Column({ nullable: true })
    @Field(() => String)
    @IsString()
    state: string

    @Column({ nullable: true })
    @Field(() => String)
    @IsString()
    address: string

    @Column({ unique: true })
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
    experience: string

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

    @Column({ type: 'enum', enum: EUserGender })
    @Field(() => EUserGender)
    gender: EUserGender

    @Column({ type: 'enum', enum: EUserClinicAccess || EUserAdminSuccess || EUserPatient })
    @Field(() => EUserClinicAccess || EUserAdminSuccess || EUserPatient)
    success: EUserClinicAccess | EUserAdminSuccess | EUserPatient

    @Column({ type: 'enum', enum: EUserRoles })
    @Field(() => EUserRoles)
    role: EUserRoles

    @Column({ type: 'enum', enum: ELanguage })
    @Field(() => ELanguage)
    language: ELanguage

    //messages: Messages // from chat service
    //clinics: Clinic[] // Pat
    //doctors: User[success='Doctor'][]//Pat, with dent
    //patients: User[success='Patient'][] // Dr/pat
    //treatments: Treatment[] // Dr/pat
    //appointments: Appointment[] // Dr/pat
    //payments: Payments // from Payments service
    //rate: Ratings
    //clinic: Clinic | null // for owner

    async hashPassword(): Promise<void> {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 12)
            } catch (error) {
                console.log(error)
                throw new InternalServerErrorException()
            }
        }
    }

    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const statusCompare = await bcrypt.compare(aPassword, this.password)
            return statusCompare
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
    }
}
