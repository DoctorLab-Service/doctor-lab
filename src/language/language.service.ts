import { ValidationException } from 'src/exceptions/validation.exception'
import { object } from 'src/common/helpers'
import { Inject, Injectable, Optional } from '@nestjs/common'
import { CONTEXT } from '@nestjs/graphql'
import { LANGUAGE } from 'src/common/common.constants'
import { ELanguage } from './dtos/languages.dto'
import { MessageDto, Messages, NotifyDto } from './dtos/notify.dto'
import * as fs from 'fs'
import * as path from 'path'
import { defaultErrors } from './notifies/default.errors'
import { CustomErrorException } from 'src/exceptions/custom-error.exception'

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
     // Fetch messages from notifies filder by params
     */
    private async fetch(type: string): Promise<NotifyDto> {
        const path = `./notifies/${this.lng.toLowerCase()}/${this.service}.${type}`
        const importedData = await import(path)
        return importedData.notifies
    }

    /**
     // Fetch serviceName files from notifies filder by params
     */
    private async fetchServiceNames(): Promise<string[]> {
        const serviceNames: string[] = []

        const files = fs.readdirSync(path.join(__dirname, './notifies/en/'))

        files.forEach(file => {
            const fileName = file.split('.')[0]
            if (serviceNames.length && serviceNames[serviceNames.length - 1] === fileName) return
            return serviceNames.push(fileName)
        })
        return serviceNames
    }

    /**
     // Get translation for messages
     * Fatch service names or set costum
     */
    private async translate(type: string, serviceName?: string[]): Promise<Messages> {
        const messages: Messages = {}
        const services: string[] = serviceName || (await this.fetchServiceNames())
        for (let i = 0; i < services.length; i++) {
            this.service = services[i]
            const msg = await this.createMessages(type)
            messages[services[i]] = msg.messages
        }

        return messages
    }

    /**
     // Create messages
     * And return message error by fildname or full errors data
     */
    private async createMessages(type: string, fieldName?: string): Promise<NotifyDto | MessageDto | any> {
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
            //* Get language from custom headers
            const customLanguage: string =
                this.context.req !== undefined ? this.context.req.headers['language'] : this.context.headers['language']
            if (customLanguage) {
                const vLanguage = customLanguage.split('-')[0].toUpperCase()
                lng = ELanguage[vLanguage]

                if (lng === undefined) return defaultLanguage

                return lng
            }

            // Get language from headers['accept-language']
            // ^ ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,pl;q=0.5,und;q=0.4
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
     // Get service name automaticly from called file path
     * @returns service name
     */
    private getServiceName(): string {
        const arrPath: string[] = []
        const errs = new Error().stack.split('at ')
        // Get  clear src path
        // push in arrPath
        for (let i = 1; i < errs.length; i++) {
            const src = errs[i].split('src')[1]

            if (src !== undefined) {
                arrPath.push(src)
            }
        }

        // Check errors path to filter out files
        const arrCandidates = arrPath.filter(path => path.includes('.service.ts') || path.includes('.resolver.ts'))
        const services = arrCandidates.map(c => {
            let name: string
            c.split('\\').forEach(cl => {
                if (cl.includes('.service.ts') || cl.includes('.resolver.ts')) {
                    if (cl.split('.')[0].length) {
                        name = cl.split('.')[0]
                        return
                    }
                    return
                }
            })
            return name
        })

        // Check files and set service name
        const service = services[services.length - 1]

        if (!service) {
            throw new ValidationException({ error: 'Service is not exist' })
        }

        return service
    }

    /**
     // Set error message
     * @param params [string, string]
     * @param service service named
     * @returns message
     */
    async setError(params: [string, string?], service?: string): Promise<string> {
        const defaultService = 'error'
        const defErrorMessage = 'An error has occurred'
        let serviceName: string = service || this.getServiceName()

        let errors: Messages | Record<string, any> = await this.translate(defaultService, [serviceName])
        // Fetch services name
        const services: string[] = await this.fetchServiceNames()

        // Check Errors exists by serviceName
        const serviceExists = services.filter(service => service === serviceName)
        if (!serviceExists.length) {
            return CustomErrorException(`Service ${serviceName} is not exists in errors`, defErrorMessage)
        }

        // Check Errors exists by params[0 ]
        if (!object.isEmpty(errors)) {
            // Check Errors exists by params[0]
            if (!(params[0] in errors[serviceName])) {
                const services: string[] = await this.fetchServiceNames()
                const messages: Messages = await this.translate(defaultService, services)

                if (!object.isEmpty(messages)) {
                    services.forEach(s => {
                        if (params[0] in messages[s]) {
                            serviceName = s
                            errors = messages[s]
                        }
                    })
                } else {
                    return CustomErrorException(`Errors object is not exist`, defErrorMessage)
                }

                if (!(params[0] in errors)) {
                    return CustomErrorException(
                        `Param [1] ${params[1]} is not exists in ${serviceName}.${params[0]} service errors`,
                        defErrorMessage,
                    )
                }
            }

            // Check Errors exists by params[1]
            if (
                params[1] && serviceName in errors
                    ? !(params[1] in errors[serviceName][params[0]])
                    : !(params[1] in errors[params[0]])
            ) {
                return CustomErrorException(
                    `Param [1] ${params[1]} is not exists in ${serviceName}.${params[0]} service errors`,
                    defErrorMessage,
                )
            }
        } else {
            return CustomErrorException(`Errors object is not exist`, defErrorMessage)
        }
        // Set errors if param[1] not exist
        // Set errors if param[1] exist
        const errorMsg: Messages = params[1]
            ? serviceName in errors
                ? errors[serviceName][params[0]][params[1]]
                : errors[params[0]][params[1]]
            : serviceName in errors
            ? errors[serviceName][params[0]]
            : errors[params[0]]

        const defaultErrorMsg = params[1] ? defaultErrors[params[0]][params[1]] : defaultErrors[params[0]]

        return !object.isEmpty(errors) ? errorMsg : defaultErrorMsg
    }

    /**
     * Get Error using language
     * @Arguments is service name strings arrow
     */
    async errors(serviceName?: string[], fieldName?: string): Promise<Messages | NotifyDto | MessageDto | any> {
        const defaultService = 'error'
        if (fieldName) {
            this.service = serviceName[0]
            const messages = await this.createMessages(defaultService, fieldName)
            return messages
        }
        this.getServiceName()

        const messages: Messages | Record<string, any> = await this.translate(defaultService, serviceName)
        return messages
    }
}
