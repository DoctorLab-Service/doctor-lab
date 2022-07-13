import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'auth',
    language: 'RU',
    messages: {
        isNotAuth: {
            auth: 'Пользователь не авторизован',
        },
        token: {
            expired: 'Срок действия токена истек',
            notCreate: 'Не удалось создать токен, попробуйте авторизоваться',
        },
    },
}
