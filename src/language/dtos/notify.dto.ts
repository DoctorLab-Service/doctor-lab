import { ELanguage } from 'src/language/dtos/languages.dto'
import { User } from 'src/users/entities/user.entity'

export class NotifyDto {
    readonly serviceName: string
    readonly language: ELanguage | string
    readonly messages: MassagesDto
}

export class MassagesDto {
    readonly [key: string]: MassageDto | string
}

export class MassageDto {
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
