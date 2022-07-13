import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'users',
    language: 'RU',
    messages: {
        isExists: {
            phone: 'Пользователь с таким номером телефона уже есть',
            email: 'Пользователь с таким адресом электронной почты уже есть',
        },
        isNotExist: {
            phone: 'Пользователь с таким номером телефона не найден',
            email: 'Пользователь с таким адресом электронной почты не найден',
        },
        isEmpty: {
            rePassword: 'Введите пароль повторно',
        },
        isLength: {
            fullname: 'Имя должно быть длиннее или равно 3 и не длиннее 64 символов',
            country: 'Название страны должно быть не длиннее 64 символов',
            state: 'Название области должно быть не длиннее 64 символов',
            address: 'Адрес должен быть не длиннее 64 символов',
            email: 'Aдрес електронной почты должен быть длиннее или равно 4 и не длиннее 64 символов',
            experience: 'Опыт работы должен быть длиннее или равно 3 символам',
            password: 'Пароль должeн быть длиннее или равно 6 и не длиннее 32 символов',
        },
        isValid: {
            phone: 'Не валидный номер телефона',
            email: 'Не валидный адрес електронной почты',
            passwordEqual: 'Пароли не совпадают',
            googleId: 'Не валидный googleId',
            facebookId: 'Не валидный facebookId',
        },
        isNot: {
            foundUser: 'Пользователь не найден',
            foundUsers: 'Ничего не найдено',
            createUser: 'Не удалось создать учетную запись',
            updateUser: 'Не удалось обновить учетную запись',
            deleteUser: 'Не удалось удалить учетную запись',
        },
    },
}
