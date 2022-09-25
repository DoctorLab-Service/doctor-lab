import { ELanguage } from 'src/language/dtos/languages.dto'
import { SystemUserParams } from './users'

export const systemUserParams: SystemUserParams = {
    email: 'doctorlab.service@gmail.com',
    phone: '+380970005433',
    fullname: 'Dmitriy Marynenko',
    password: '123456',
    verifiedEmail: true,
    verifiedPhone: true,
    language: ELanguage.RU,
}
