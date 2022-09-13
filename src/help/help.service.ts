import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HelpAnswer, HelpMessage } from './entities'
import {
    CreateHelpMessageInput,
    CreateHelpMessageOutput,
    DeleteHelpMessageInput,
    DeleteHelpMessageOutput,
    FindAllHelpMessagesOutput,
    FindHelpMessageByIdInput,
    FindHelpMessageByIdOutput,
    ReadHelpMessageInput,
    ReadHelpMessageOutput,
    AnswerToHelpMessageInput,
    AnswerToHelpMessageOutput,
    CloseHelpMessageInput,
    CloseHelpMessageOutput,
} from './dtos'
import { User } from 'src/users/entities'
import { LanguageService } from 'src/language/language.service'
import { ValidationException } from 'src/exceptions'
import { CONTEXT } from '@nestjs/graphql'
import { TokenService } from 'src/token/token.service'
import { EmailService } from 'src/email/email.service'

@Injectable()
export class HelpService {
    constructor(
        @Inject(CONTEXT) private readonly context,
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(HelpMessage) private readonly helpMessages: Repository<HelpMessage>,
        @InjectRepository(HelpAnswer) private readonly helpAnswer: Repository<HelpAnswer>,
        private readonly languageService: LanguageService,
        private readonly emailService: EmailService,
        private readonly token: TokenService,
    ) {}
    /**
     * Create help message
     * @param body { fullname: string, email: string, title: string, text: string }
     * @returns message
     */
    async createHelpMessage(body: CreateHelpMessageInput): Promise<CreateHelpMessageOutput> {
        try {
            // Find user by email
            const user: User = await this.users.findOne({ where: { email: body.email } })

            // Send Help Massage Email to user email
            const sendEmail = await this.emailService.sendHelpMassageEmail({
                fullname: body.fullname,
                subject: body.title,
                text: body.text,
            })
            if (!sendEmail) {
                throw new ValidationException({
                    create: await this.languageService.setError(['isNot', 'sendAnswerMessage'], 'messages'),
                })
            }

            // Combine sender object
            // Create message
            const sender = { ...body, user: user || null }
            const createdMessage = await this.helpMessages.save(this.helpMessages.create(sender))

            return { ok: Boolean(createdMessage), message: createdMessage }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                create: await this.languageService.setError(['isNot', 'createMessage'], 'messages'),
            })
        }
    }

    /**
     * Delete help message by id
     * @param body { id: number }
     * @returns boolean
     */
    async deleteHelpMessage(body: DeleteHelpMessageInput): Promise<DeleteHelpMessageOutput> {
        //  Check message by existind if not to send  error
        const message = await this.helpMessages.findOne({ where: { id: body.id } })
        if (!message) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNot', 'foundMessages'], 'messages'),
            })
        }

        // Delete message by id
        try {
            const deletedMessage = await this.helpMessages.delete(body.id)
            return { ok: Boolean(deletedMessage.affected > 0) }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                delete: await this.languageService.setError(['isNot', 'deleteMessage'], 'messages'),
            })
        }
    }

    /**
     * Find all messages
     * @returns messages
     */
    async findAllHelpMessages(): Promise<FindAllHelpMessagesOutput> {
        try {
            const messages = await this.helpMessages.find({})
            return { ok: Boolean(messages), messages }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                not_found: await this.languageService.setError(['isNot', 'foundMessages'], 'messages'),
            })
        }
    }

    /**
     * Find message by id
     * @param body { id: number }
     * @returns message
     */
    async findHelpMessageById(body: FindHelpMessageByIdInput): Promise<FindHelpMessageByIdOutput> {
        const message = await this.helpMessages.findOne({ where: { id: body.id } })
        if (!message) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNot', 'foundMessages'], 'messages'),
            })
        }
        return { ok: Boolean(message), message }
    }

    /**
     * Set read message
     * @param body { id: number }
     * @returns message
     */
    async readHelpMessage(body: ReadHelpMessageInput): Promise<ReadHelpMessageOutput> {
        // Get message by id
        const message = await this.helpMessages.findOne({ where: { id: body.id } })
        if (!message) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNot', 'foundMessages'], 'messages'),
            })
        }

        // Set it readed, and return message
        try {
            message.read = true
            const setRead = await this.helpMessages.save(message)
            return { ok: Boolean(setRead), message }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                change: await this.languageService.setError(['isNot', 'readMessage'], 'messages'),
            })
        }
    }

    /**
     * Answer Message
     * @param body { id: number, title: string, text: string }
     * @returns message answer
     */
    async answerToHelpMessage(body: AnswerToHelpMessageInput): Promise<AnswerToHelpMessageOutput> {
        // Get message by id
        const message = await this.helpMessages.findOne({ where: { id: body.id } })
        if (!message) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNot', 'foundMessages'], 'messages'),
            })
        }

        // Create answer for the message
        const currentUser: User = await this.token.getContextUser(this.context)
        const answer = await this.helpAnswer.save(
            this.helpAnswer.create({
                title: body.title,
                text: body.text,
                message,
                user: currentUser,
            }),
        )
        if (!answer) {
            throw new ValidationException({
                create: await this.languageService.setError(['isNot', 'createMessage'], 'messages'),
            })
        }

        // Send Help Massage Email to user email
        const sendEmail = await this.emailService.sendHelpMassageEmail({
            to: message.email,
            fullname: message.fullname,
            subject: body.title,
            text: body.text,
        })

        if (!sendEmail) {
            throw new ValidationException({
                create: await this.languageService.setError(['isNot', 'sendAnswerMessage'], 'messages'),
            })
        }

        return { ok: Boolean(answer), message: answer }
    }

    /**
     * Set closed message
     * @param body { id: number }
     * @returns message
     */
    async closeHelpMessage(body: CloseHelpMessageInput): Promise<CloseHelpMessageOutput> {
        // Get message by id
        const message = await this.helpMessages.findOne({ where: { id: body.id } })
        if (!message) {
            throw new ValidationException({
                not_exists: await this.languageService.setError(['isNot', 'foundMessages'], 'messages'),
            })
        }

        try {
            message.closed = true
            const closedMessage = await this.helpMessages.save(message)
            return { ok: Boolean(closedMessage), message }
        } catch (error) {
            console.log(error)
            throw new ValidationException({
                change: await this.languageService.setError(['isNot', 'closeMessage'], 'messages'),
            })
        }
    }
}
