import { InputType, ObjectType, Field } from '@nestjs/graphql'
import { Length } from 'class-validator'
import { CoreEntity } from 'src/common/entities'
import { User } from 'src/users/entities'
import { Entity, Column, ManyToOne } from 'typeorm'
import { HelpMessage } from './help-message.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity('help_answers')
export class HelpAnswer extends CoreEntity {
    @ManyToOne(() => HelpMessage, message => message.answers, { onDelete: 'CASCADE' })
    @Field(() => User)
    message: HelpMessage

    @ManyToOne(() => User, user => user.HelpMessage, { onDelete: 'CASCADE', eager: true })
    @Field(() => User, { nullable: true })
    user: User

    @Column()
    @Field(() => String)
    @Length(3, 64)
    title: string

    @Column()
    @Field(() => String)
    @Length(3, 255)
    text: string

    // attachments: [{ type: Schema.Types.ObjectId, ref: "UploadFile" }],
}
