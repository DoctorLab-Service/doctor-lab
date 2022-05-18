import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'users',
    language: 'en',
    messages: {
        exist: {
            phone: 'There is user with that phone already',
            email: 'There is user with that email already',
        },
    },
}
