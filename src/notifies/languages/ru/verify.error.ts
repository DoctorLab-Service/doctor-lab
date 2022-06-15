import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'verify',
    language: 'RU',
    messages: {
        isNotVerify: {
            noSendSMS: 'Не удалось отправить вам смс',
            email: 'Не валидная ссылка',
            phone: 'Не верный код',
        },
    },
}
