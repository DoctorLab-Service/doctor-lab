import { ELanguage } from 'src/language/dtos/languages.dto'
import { User } from 'src/users/entities/user.entity'

export class NotifyDto {
    readonly serviceName: string
    readonly language: ELanguage | string
    readonly messages: MessagesDto
}

export class MessagesDto {
    readonly [key: string]: MessageDto | string
}
export class DeffaultMessages {
    [key: string]: MessagesDto | MessageDto | string
}

export class MessageDto {
    readonly [key: string]: string | number
}

export class SetLanguageMessageParams {
    user?: User
    language?: ELanguage
    serviceName: string[]
    type: string
}
export class Messages {
    [key: string]: NotifyDto
}
