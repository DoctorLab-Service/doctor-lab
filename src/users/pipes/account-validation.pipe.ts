import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from 'src/exceptions/validation.exception'
import { LanguageService } from 'src/language/language.service'

@Injectable()
export class AccountValidationPipe implements PipeTransform {
    serviceName: string
    constructor(serviceName: string) {
        this.serviceName = serviceName
    }

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const errors = {}
        const fields = plainToClass(metadata.metatype, value)

        /**
         * Set custom valid messages on languages
         */
        if (fields !== undefined) {
            const languageService = new LanguageService(undefined, fields.language)

            const setMassage = async (property: [string, string?], key: string): Promise<void> => {
                const errorsMessage = await languageService.errors([this.serviceName], key)
                errors[property[0]] = errorsMessage[property[1] || property[0]]
            }
            /**
             * Validate fields
             */
            const vErrors = await validate(fields)

            if (vErrors.length) {
                for (let i = 0; i < vErrors.length; i++) {
                    const key = Object.keys(vErrors[i].constraints)[0]
                    if (key === 'isLength' || key === 'maxLength') {
                        await setMassage([vErrors[i].property], 'isLength')
                    }
                    if (key === 'isNotEmpty') {
                        await setMassage([vErrors[i].property], 'isEmpty')
                    }
                    if (key === 'isEmail' || key === 'isPhoneNumber') {
                        await setMassage([vErrors[i].property], 'isValid')
                    }
                }
            }
            for (const field in fields) {
                /**
                 * Validation password to equal with rePassword
                 */
                if (field === 'rePassword') {
                    if (fields.password !== fields[field]) {
                        await setMassage([field, 'passwordEqual'], 'isValid')
                    }
                }
            }
            console.log(errors)
            if (JSON.stringify(errors) !== '{}') {
                throw new ValidationException(errors)
            }
            //---------------------------------------------------------------
            // const notifiesService = new NotifyService()
            // notifiesService.init(fields.language, this.serviceName)

            // const setMassage = async (property: [string, string?], key: string): Promise<void> => {
            //     const errorsMessage = await notifiesService.notify('error', key)
            //     errors[property[0]] = errorsMessage[property[1] || property[0]]
            // }
            // /**
            //  * Validate fields
            //  */
            // const vErrors = await validate(fields)

            // if (vErrors.length) {
            //     for (let i = 0; i < vErrors.length; i++) {
            //         const key = Object.keys(vErrors[i].constraints)[0]
            //         if (key === 'isLength' || key === 'maxLength') {
            //             await setMassage([vErrors[i].property], 'isLength')
            //         }
            //         if (key === 'isNotEmpty') {
            //             await setMassage([vErrors[i].property], 'isEmpty')
            //         }
            //         if (key === 'isEmail' || key === 'isPhoneNumber') {
            //             await setMassage([vErrors[i].property], 'isValid')
            //         }
            //     }
            // }
            // for (const field in fields) {
            //     /**
            //      * Validation password to equal with rePassword
            //      */
            //     if (field === 'rePassword') {
            //         if (fields.password !== fields[field]) {
            //             await setMassage([field, 'passwordEqual'], 'isValid')
            //         }
            //     }
            // }
            // console.log(errors)
            // if (JSON.stringify(errors) !== '{}') {
            //     throw new ValidationException(errors)
            // }
        }

        return value
    }
}
