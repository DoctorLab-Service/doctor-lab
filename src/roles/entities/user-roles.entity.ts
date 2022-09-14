import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { User } from 'src/users/entities'
import { Role } from './role.entity'
import { CoreEntity } from 'src/common/entities'
import { ERolesType } from '../roles.enums'

@InputType({ isAbstract: true })
@ObjectType()
@Entity('user_roles')
export class UserRoles extends CoreEntity {
    @ManyToOne(() => User, user => user.roles, { onDelete: 'CASCADE', eager: true })
    @Field(() => User)
    user: User

    @ManyToOne(() => Role, { onDelete: 'CASCADE', eager: true })
    @Field(() => Role)
    role: Role

    @Column({ type: 'enum', enum: ERolesType, default: ERolesType.custom })
    @Field(() => ERolesType)
    type: ERolesType

    @ManyToOne(() => User, user => user.setRoles, { onDelete: 'CASCADE', eager: true })
    @Field(() => User)
    setTheRole: User
}
