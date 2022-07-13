import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'auth',
    language: 'EN',
    messages: {
        isNotAuth: {
            auth: 'User is not authorized',
        },
        token: {
            expired: 'Token has expired',
            notCreated: "Couldn't create token, try to login",
        },
    },
}
