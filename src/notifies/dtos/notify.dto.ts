import { ELanguage } from 'src/common/common.enums'

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
