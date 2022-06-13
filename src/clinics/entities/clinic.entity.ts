import { CoreEntity } from './../../common/entities/core.entity'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { IsEmail, IsPhoneNumber, IsString, Length, MaxLength } from 'class-validator'
import { User } from 'src/users/entities/user.entity'
import { Role } from 'src/roles/entities/role.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Clinic extends CoreEntity {
    @OneToOne(() => User, user => user.clinic)
    @Field(() => User)
    owner: User

    @Column()
    @Field(() => String)
    @IsString()
    @Length(3, 64)
    name: string

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

    @OneToMany(() => Role, roles => roles.clinic)
    @Field(() => [Role])
    roles: Role[]

    // doctors: User[permissions='Doctor'][]// with dentist
    // patients: User[permissions='Patient'][]
    // managers: User[permissions='Manager'][]
    // assistants: User[permissions='Assistant'][]
    // treatments: Treatment[]
    // appointments: Appointment[]
    // rate: Ratings // Clinic rate
}
