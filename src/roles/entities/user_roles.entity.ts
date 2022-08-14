import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { Role } from './role.entity'
import { CoreEntity } from 'src/common/entities/core.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity('user_roles')
export class UserRoles extends CoreEntity {
    @ManyToOne(() => User, user => user.roles, { onDelete: 'CASCADE', eager: true })
    @Field(() => User)
    user: User

    @OneToOne(() => Role, role => role.roleKey, { onDelete: 'CASCADE', eager: true })
    @JoinColumn()
    @Field(() => Role)
    role: Role

    @ManyToOne(() => User, user => user.setRoles, { onDelete: 'CASCADE', eager: true })
    @Field(() => User)
    setTheRole: User
}
