import { ELanguage } from 'src/language/dtos/languages.dto'
import { SystemUserParams } from './users'

export const systemUserParams: SystemUserParams = {
    email: 'doctorlab.service@gmail.com',
    phone: '+380970005433',
    fullname: 'Dmitriy Marynenko',
    address: 'Some kiev address',
    experience: '1 Years',
    password: '123456',
    verifiedEmail: true,
    verifiedPhone: true,
    language: ELanguage.RU,
}
