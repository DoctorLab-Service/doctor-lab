import { CoreEntity } from 'src/common/entities/core.entity'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from 'src/users/entities/user.entity'

@ObjectType()
@Entity('tokens')
export class Token extends CoreEntity {
    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    @Column({ unique: true })
    accessToken: string

    @Column({ unique: true })
    refreshToken: string
}