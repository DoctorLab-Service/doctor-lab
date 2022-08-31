import { InternalServerErrorException } from '@nestjs/common'
import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { IsString, Length, MaxLength } from 'class-validator'
import { CoreEntity } from 'src/common/entities'
import { string } from 'src/common/helpers'
import { User } from 'src/users/entities'
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { ERolesType } from '../roles.enums'

registerEnumType(ERolesType, { name: 'ERolesType' })

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

    @Column({ type: 'enum', enum: ERolesType, default: ERolesType.custom })
    @Field(() => ERolesType)
    type: ERolesType

    @ManyToOne(() => User, user => user.createdRoles, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    /**
        Create Role Key
     */
    @BeforeInsert()
    @BeforeUpdate()
    async addRoleKey(): Promise<void> {
        if (this.role) {
            try {
                this.roleKey = string.trimRole(this.role)
            } catch (error) {
                console.log(error)
                throw new InternalServerErrorException()
            }
        }
    }
}
