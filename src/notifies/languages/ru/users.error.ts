import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'users',
    language: 'RU',
    messages: {
        isExist: {
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
            fullname: 'Имя должно быть длиннее или равно 3 символам',
            country: 'Название страны должно быть не длиннее 64 символов',
            state: 'Название области должно быть не длиннее 64 символов',
            address: 'Адрес должен быть не длиннее 64 символов',
            email: 'Aдрес електронной почты должен быть длиннее или равно 4 символам',
            experience: 'Опыт работы должен быть длиннее или равно 3 символам',
            password: 'Пароль должeн быть длиннее или равно 6 символам',
        },
        isValid: {
            phone: 'Не валидный номер телефона',
            email: 'Не валидный адрес електронной почты',
            passwordEqual: 'Пароли не совпадают',
        },
        isNotFound: {
            user: 'Пользователь не найден',
            users: 'Ничего не найдено',
        },
        isNotCreate: {
            user: 'Не удалось создать учетную запись',
        },
    },
}
