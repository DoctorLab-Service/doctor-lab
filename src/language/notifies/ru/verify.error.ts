import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'verify',
    language: 'RU',
    messages: {
        isNotVerify: {
            noSendEmail: 'Не удалось отправить вам сообщение на электронную почту',
            noSendSMS: 'Не удалось отправить вам смс',
            email: 'Не валидная ссылка',
            phone: 'Не верный код',
        },
    },
}
