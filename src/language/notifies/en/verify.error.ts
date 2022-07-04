import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'verify',
    language: 'EN',
    messages: {
        isNotVerify: {
            noSendEmail: 'Unable to send you email',
            noSendSMS: 'Unable to send you SMS',
            email: 'Not a valid verification link',
            phone: 'Invalid code',
        },
    },
}
