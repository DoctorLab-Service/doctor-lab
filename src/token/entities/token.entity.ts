import { CoreEntity } from 'src/common/entities'
import { ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { User } from 'src/users/entities'

@ObjectType()
@Entity('tokens')
export class Token extends CoreEntity {
    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User

    @Column({ nullable: true, unique: true })
    accessToken: string

    @Column({ nullable: true, unique: true })
    recoveryToken: string

    @Column({ unique: true })
    refreshToken: string
}
