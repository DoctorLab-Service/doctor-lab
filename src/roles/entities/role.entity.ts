import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsString, Length, MaxLength } from 'class-validator'
import { CoreEntity } from 'src/common/entities/core.entity'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

@InputType({ isAbstract: true })
@ObjectType()
@Entity('roles')
export class Role extends CoreEntity {
    @Column({ unique: true })
    @Field(() => String)
    @IsString()
    @Length(4, 32)
    role: string

    @Column()
    @Field(() => String)
    @IsString()
    @MaxLength(255)
    description: string

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    system: boolean

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User
}
