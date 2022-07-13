import { InternalServerErrorException } from '@nestjs/common'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsString, Length, MaxLength } from 'class-validator'
import { CoreEntity } from 'src/common/entities/core.entity'
import { string } from 'src/common/helpers'
import { User } from 'src/users/entities/user.entity'
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@InputType({ isAbstract: true })
@ObjectType()
@Entity('roles')
export class Role extends CoreEntity {
    @Column({ unique: true })
    @Field(() => String)
    @IsString()
    @Length(4, 32)
    role: string

    @Column({ unique: true })
    @Field(() => String)
    @IsString()
    @Length(4, 32)
    roleKey: string

    @Column()
    @Field(() => String)
    @IsString()
    @MaxLength(255)
    description: string

    @Column({ default: false })
    @Field(() => Boolean)
    @IsBoolean()
    system: boolean

    @ManyToOne(() => User, user => user.createdRoles, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    /**
        Create Role Key
     */
    @BeforeInsert()
    @BeforeUpdate()
    async addRoleKey(): Promise<void> {
        if (this.role) {
            console.log(this.role)
            try {
                this.roleKey = string.trimRole(this.role)
            } catch (error) {
                console.log(error)
                throw new InternalServerErrorException()
            }
        }
    }
}
