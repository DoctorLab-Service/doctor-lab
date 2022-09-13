import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'messages',
    language: 'EN',
    messages: {
        isNot: {
            foundMessages: 'Сообщений не найдено',
            createMessage: 'Не удалось отправить сообщение',
            deleteMessage: 'Не удалось удалить сообщение',
            closeMessage: 'Не удалось закрыть сообщение',
            readMessage: 'Не удалось открыть сообщение',
            sendAnswerMessage: 'Не удалось отправить сообщение пользователю',
        },
    },
}
