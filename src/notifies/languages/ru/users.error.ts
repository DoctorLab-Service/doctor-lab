import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'users',
    language: 'ru',
    messages: {
        exist: {
            phone: 'Пользователь с таким номером телефона уже есть',
            email: 'Пользователь с таким адресом электронной почты уже есть',
        },
        field: {
            fullname: 'Введите ваше имя',
            experience: 'Введите ваш опыт работы',
            phone: 'Введите ваш номер телефона',
            email: 'Введите ваш адрес электронной почты',
            password: 'Введите пароль',
            rePassword: 'Введите пароль повторно',
            passwordEqual: 'Пароли не совпадают',
        },
    },
}
