import { InputType, ObjectType, Field } from '@nestjs/graphql'
import { Length, IsEmail } from 'class-validator'
import { CoreEntity } from 'src/common/entities'
import { User } from 'src/users/entities'
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { HelpAnswer } from './help-answer.entity'

@InputType({ isAbstract: true })
@ObjectType()
@Entity('help_messages')
export class HelpMessage extends CoreEntity {
    @Column()
    @Field(() => String)
    @Length(3, 64)
    fullname: string

    @Column()
    @Field(() => String)
    @IsEmail()
    @Length(4, 64)
    email: string

    @Column()
    @Field(() => String)
    @Length(3, 64)
    title: string

    @Column()
    @Field(() => String)
    @Length(3, 255)
    text: string

    @Column({ default: false })
    @Field(() => Boolean)
    read: boolean

    @Column({ default: false })
    @Field(() => Boolean)
    closed: boolean

    // Nullable if user is not authorized
    @ManyToOne(() => User, user => user.helpMessage, { nullable: true, onDelete: 'CASCADE' })
    @Field(() => User, { nullable: true })
    user: User

    @OneToMany(() => HelpAnswer, answer => answer.message)
    @Field(() => [HelpAnswer], { defaultValue: [] })
    answers: HelpAnswer[]

    // attachments: [{ type: Schema.Types.ObjectId, ref: "UploadFile" }],
}
