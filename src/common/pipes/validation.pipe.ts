import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from 'src/exceptions'
import { ELanguage } from 'src/language/dtos/languages.dto'
import { LanguageService } from 'src/language/language.service'

@Injectable()
export class ValidationPipe implements PipeTransform {
    serviceName: string
    constructor(serviceName: string) {
        this.serviceName = serviceName
    }
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const errors = {}
        const fields = plainToClass(metadata.metatype, value) || {}
        /**
         * Set custom valid messages on languages
         */
        if (fields !== undefined) {
            const language = fields.language ? fields.language : ELanguage.EN
            const languageService = new LanguageService(undefined, language)

            const setMessage = async (property: [string, string?], key: string): Promise<void> => {
                errors[property[0]] = await languageService.setError(
                    [key, property[1] || property[0]],
                    this.serviceName,
                )
            }
            // const setMessage = async (property: [string, string?], key: string): Promise<void> => {
            //     const errorsMessage = await languageService.errors([this.serviceName], key)
            //     errors[property[0]] = errorsMessage[property[1] || property[0]]
            // }

            /**
             * Validate fields
             */
            const vErrors = await validate(fields)
            if (vErrors.length) {
                for (let i = 0; i < vErrors.length; i++) {
                    const key = Object.keys(vErrors[i].constraints)[0]
                    if (key === 'isLength' || key === 'maxLength') {
                        await setMessage([vErrors[i].property], 'isLength')
                    }
                    if (key === 'isNotEmpty') {
                        await setMessage([vErrors[i].property], 'isEmpty')
                    }
                    if (key === 'isEmail' || key === 'isPhoneNumber') {
                        await setMessage([vErrors[i].property], 'isValid')
                    }
                }
            }
            for (const field in fields) {
                /**
                 * Validation password to equal with rePassword
                 */
                if (field === 'rePassword') {
                    if (fields.password !== fields[field]) {
                        await setMessage([field, 'passwordEqual'], 'isValid')
                    }
                }
                /**
                 * Validation password to equal with rePassword
                 */
                if (field === 'reEmail') {
                    if (fields.email !== fields[field]) {
                        await setMessage([field, 'emailEqual'], 'isValid')
                    }
                }
            }
            if (JSON.stringify(errors) !== '{}') {
                throw new ValidationException(errors)
            }
        }

        return value
    }
}
