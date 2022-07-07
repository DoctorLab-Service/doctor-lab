import { Inject, Injectable, Optional } from '@nestjs/common'
import { CONTEXT } from '@nestjs/graphql'
import { LANGUAGE } from 'src/common/common.constants'
import { ELanguage } from './dtos/languages.dto'
import { MassageDto, Messages, NotifyDto } from './dtos/notify.dto'

@Injectable()
export class LanguageService {
    private service: string
    private lng: ELanguage | undefined

    constructor(
        @Inject(CONTEXT) private readonly context?,
        @Optional() @Inject(LANGUAGE) private readonly clanguage?: ELanguage | string,
    ) {
        this.lng = this.clanguage && this.clanguage !== undefined ? this.language(this.clanguage) : this.language()
    }

    /**
     * Fetch messages from notifies filder by params
     */
    private async fetch(type: string): Promise<NotifyDto> {
        const path = `./notifies/${this.lng.toLowerCase()}/${this.service}.${type}`
        const importedData = await import(path)
        return importedData.notifies
    }

    /**
     * Get translation for messages
     */
    private async translate(serviceName: string[], type: string): Promise<Messages> {
        const messages: Messages = {}

        for (let i = 0; i < serviceName.length; i++) {
            this.service = serviceName[i]
            const msg = await this.createMessages(type)
            messages[serviceName[i]] = msg.messages
        }
        return messages
    }

    /**
     * Create messages
     * And return message error by fildname or full errors data
     */
    private async createMessages(type: string, fieldName?: string): Promise<NotifyDto | MassageDto | any> {
        const data = await this.fetch(type)
        return fieldName ? data.messages[fieldName] : data
    }

    /**
     * Get language from headers
     */
    language(cLanguage?: string): ELanguage {
        let lng: ELanguage | undefined
        const defaultLanguage = ELanguage.EN
        // Set custom language
        if (cLanguage && cLanguage !== undefined) {
            const vLanguage = cLanguage.split('-')[0].toUpperCase()
            lng = ELanguage[vLanguage]

            if (lng === undefined) return defaultLanguage
            return lng
        }
        if (this.context !== undefined) {
            // Get language from custom headers
            const customLanguage: string =
                this.context.req !== undefined ? this.context.req.headers['language'] : this.context.headers['language']
            if (customLanguage) {
                const vLanguage = customLanguage.split('-')[0].toUpperCase()
                lng = ELanguage[vLanguage]

                if (lng === undefined) return defaultLanguage

                return lng
            }

            // Get language from headers['accept-language']
            // ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,pl;q=0.5,und;q=0.4
            const acceptLanguage: string =
                this.context.req !== undefined
                    ? this.context.req.headers['accept-language']
                    : this.context.headers['accept-language']
            if (acceptLanguage) {
                const alanguage = acceptLanguage.split(',')[1].split(';')[0]
                const vLanguage = alanguage.split('-')[0].toUpperCase()
                lng = ELanguage[vLanguage]

                if (lng === undefined) return defaultLanguage

                return lng
            }
        }
        return defaultLanguage
    }

    /**
     * Get Error using language
     * Argument is service name strings arrow
     */
    async errors(serviceName: string[], fieldName?: string): Promise<Messages | NotifyDto | MassageDto | any> {
        const defaultService = 'error'
        if (fieldName) {
            this.service = serviceName[0]
            const messages = await this.createMessages(defaultService, fieldName)
            return messages
        }

        const messages: Messages | Record<string, any> = await this.translate(serviceName, defaultService)

        return messages
    }
}
