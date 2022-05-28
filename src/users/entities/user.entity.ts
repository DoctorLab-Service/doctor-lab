import * as bcrypt from 'bcrypt'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { CoteEntity } from 'src/common/entities/core.entity'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'
import {
    ELanguage,
    EUserPatient,
    EUserAdminSuccess,
    EUserClinicAccess,
    EUserGender,
    EUserRoles,
} from 'src/common/common.enums'
import { InternalServerErrorException } from '@nestjs/common'
import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, MaxLength } from 'class-validator'

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
    @Length(3, 64)
    fullname: string

    @Column({ nullable: true })
    @Field(() => String)
    @IsString()
    @MaxLength(64)
    country: string

    @Column({ nullable: true })
    @Field(() => String)
    @IsString()
    @MaxLength(64)
    state: string

    @Column({ nullable: true })
    @Field(() => String)
    @IsString()
    @MaxLength(64)
    address: string

    @Column({ unique: true })
    @Field(() => String)
    @IsPhoneNumber()
    phone: string

    @Column({ unique: true })
    @Field(() => String)
    @IsEmail()
    @Length(4, 64)
    email: string

    @Column()
    @Field(() => String)
    @IsString()
    @Length(3, 32)
    experience: string

    @Column({ select: false })
    @Field(() => String)
    @IsString()
    @Length(6, 32)
    password: string

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    verifiedPhone: boolean // false

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    verifiedEmail: boolean // false

    @Column({ type: 'enum', enum: EUserGender, default: EUserGender.NotChosen })
    @Field(() => EUserGender)
    gender: EUserGender

    @Column({
        type: 'enum',
        enum: EUserClinicAccess || EUserAdminSuccess || EUserPatient,
        default: EUserClinicAccess.Doctor,
    })
    @Field(() => EUserClinicAccess || EUserAdminSuccess || EUserPatient)
    success: EUserClinicAccess | EUserAdminSuccess | EUserPatient

    @Column({ type: 'enum', enum: EUserRoles, default: EUserRoles.Clinic })
    @Field(() => EUserRoles)
    role: EUserRoles

    @Column({ type: 'enum', enum: ELanguage, default: ELanguage.RU })
    @Field(() => ELanguage)
    language: ELanguage

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (this.password) {
            try {
                console.log('test hesh password')
                this.password = await bcrypt.hash(this.password, 12)
            } catch (error) {
                console.log(error)
                throw new InternalServerErrorException()
            }
        }
    }

    async checkPassword(aPassword: string): Promise<boolean> {
        try {
            const statusCompare: boolean = await bcrypt.compare(aPassword, this.password)
            return statusCompare
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
    }

    //messages: Messages // from chat service
    //clinics: Clinic[] // Pat
    //doctors: User[success='Doctor'][]//Pat, with dent
    //patients: User[success='Patient'][] // Dr/pat
    //treatments: Treatment[] // Dr/pat
    //appointments: Appointment[] // Dr/pat
    //payments: Payments // from Payments service
    //rate: Ratings
    //clinic: Clinic | null // for owner
}
