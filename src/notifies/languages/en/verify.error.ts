import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'verify',
    language: 'EN',
    messages: {
        isNotVerify: {
            noSendSMS: 'Unable to send you SMS',
            email: 'Not a valid verification link',
            phone: 'Invalid code',
        },
    },
}
