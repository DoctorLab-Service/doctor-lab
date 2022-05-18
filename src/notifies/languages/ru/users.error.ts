import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'users',
    language: 'ru',
    messages: {
        exist: {
            phone: 'Пользователь с таким номером телефона уже есть',
            email: 'Пользователь с таким адресом электронной почты уже есть',
        },
    },
}
