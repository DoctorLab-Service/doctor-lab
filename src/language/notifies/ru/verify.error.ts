import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'verify',
    language: 'RU',
    messages: {
        isNotVerify: {
            email: 'Электронная почта не подтверждена',
            phone: 'Номер телефона не подтвержден',
            noSendEmail: 'Не удалось отправить вам сообщение на электронную почту',
            noSendSMS: 'Не удалось отправить вам смс',
            code: 'Не верный код',
        },
    },
}
