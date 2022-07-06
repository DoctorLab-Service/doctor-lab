import { CoreEntity } from './../../common/entities/core.entity'
import { InputType, ObjectType } from '@nestjs/graphql'
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { User } from 'src/users/entities/user.entity'
import { Role } from './role.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity('user_roles')
export class UserRoles extends CoreEntity {
    @ManyToOne(() => User, user => user.roles, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    @OneToOne(() => Role, { onDelete: 'CASCADE' })
    @JoinColumn()
    role: Role
}
