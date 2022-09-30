import { ELanguage } from 'src/language/dtos/languages.dto'
import { systemUserParams } from 'src/users/config/users.config'
import { EGender } from 'src/users/config/users.enum'
import { UserStub } from '../types'

export const systemUserStub = (): UserStub => {
    return systemUserParams
}

export const userStub = (): UserStub => {
    return {
        id: 1,
        fullname: 'dl_user',
        phone: '+380979995500',
        email: 'dl.service@email.com',
        password: 'dl.password',
        verifiedPhone: false,
        verifiedEmail: false,
        avatar: '',
        birthdate: undefined,
        country: '',
        state: '',
        address: '',
        experience: '',
        facebookId: '',
        googleId: '',
        language: ELanguage.RU,
        gender: EGender.NotChosen,
        roles: [],
        createdRoles: [],
        setRoles: [],
        helpMessage: [],
        resetKey: null,
    }
}
export const userUpdateStub = (): UserStub => {
    return {
        fullname: 'dl_user__1',
        birthdate: new Date('04.04.1992'),
        country: 'Ukraine',
        state: 'Ternopil',
        address: 'Ternopil',
        experience: '1 years',
        language: ELanguage.EN,
    }
    test.todo('sh')
}
