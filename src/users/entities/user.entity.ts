import * as bcrypt from 'bcrypt'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { ELanguage, EUserGender, EUserRoles, EUserPermissions } from 'src/common/common.enums'
import { InternalServerErrorException } from '@nestjs/common'
import { IsBoolean, IsDate, IsEmail, IsPhoneNumber, Length, MaxLength } from 'class-validator'
import { CoreEntity } from 'src/common/entities/core.entity'
import { Role } from 'src/roles/entities/role.entity'
import { Clinic } from 'src/clinics/entities/clinic.entity'

registerEnumType(ELanguage, { name: 'ELanguage' })
registerEnumType(EUserPermissions, { name: 'EUserPermissions' })
registerEnumType(EUserGender, { name: 'EUserGender' })
registerEnumType(EUserRoles, { name: 'EUserRoles' })

@InputType({ isAbstract: true })
@ObjectType()
@Entity('users')
export class User extends CoreEntity {
    @Column()
    @Field(() => String)
    @Length(3, 64)
    fullname: string

    @Column({ nullable: true })
    @Field(() => Date)
    @IsDate()
    birthdate: Date

    @Column({ nullable: true })
    @Field(() => String)
    @MaxLength(64)
    country: string

    @Column({ nullable: true })
    @Field(() => String)
    @MaxLength(64)
    state: string

    @Column({ nullable: true })
    @Field(() => String)
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
    @Length(3, 32)
    experience: string

    @Column({ select: false })
    @Field(() => String)
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

    @Column({ nullable: true })
    @Field(() => String)
    facebookId: string

    @Column({ nullable: true })
    @Field(() => String)
    googleId: string

    @Column({ type: 'enum', enum: EUserGender, default: EUserGender.NotChosen })
    @Field(() => EUserGender)
    gender: EUserGender

    @Column({ type: 'enum', enum: EUserPermissions, nullable: true })
    @Field(() => EUserPermissions)
    permissions: EUserPermissions

    @Column({ type: 'enum', enum: EUserRoles, default: EUserRoles.Clinic })
    @Field(() => EUserRoles)
    role: EUserRoles

    @OneToMany(() => Role, roles => roles.user)
    @Field(() => [Role])
    roles: Role[]

    @Column({ type: 'enum', enum: ELanguage, default: ELanguage.RU })
    @Field(() => ELanguage)
    language: ELanguage

    @OneToOne(() => Clinic, clinic => clinic.owner)
    @Field(() => Clinic)
    clinic: Clinic

    //messages: Messages // from chat service
    //clinics: Clinic[] // Pat
    //doctors: User[Permissions='Doctor'][]//Pat, with dent
    //patients: User[Permissions='Patient'][] // Dr/pat
    //treatments: Treatment[] // Dr/pat
    //appointments: Appointment[] // Dr/pat
    //payments: Payments // from Payments service
    //rate: Ratings

    @BeforeInsert()
    async setPermissions(): Promise<void> {
        if (this.role === EUserRoles.Admin) {
            this.permissions = EUserPermissions.Support
        }
        if (this.role === EUserRoles.Clinic) {
            this.permissions = EUserPermissions.Doctor
        }
        if (this.role === EUserRoles.Patient) {
            this.permissions = EUserPermissions.Patient
        }
    }

    /*
        Hash passwords
        Check passwords
    */
    @BeforeInsert()
    @BeforeUpdate()
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
            const statusCompare: boolean = await bcrypt.compare(aPassword, this.password)
            return statusCompare
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
    }
}
