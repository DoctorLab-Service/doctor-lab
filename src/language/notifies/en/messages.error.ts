import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'messages',
    language: 'EN',
    messages: {
        isNot: {
            foundMessages: 'No messages found',
            createMessage: 'Failed to send message',
            deleteMessage: 'Unable to delete message',
            closeMessage: 'Unable to close message',
            readMessage: 'Unable to open message',
            sendAnswerMessage: 'Failed to send message to user',
        },
    },
}
