import { TCheckFieldsDto, FieldDto } from './dtos/check-fields.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ValidateService {
    private errors: FieldDto = {}

    checkFields: TCheckFieldsDto = (notify, fields) => {
        for (const field in fields) {
            if (fields[field] === undefined) {
                this.errors[field] = notify[field]
                //errors.push([field]: errorsField[field])
            }
        }
        return this.errors
    }
}
