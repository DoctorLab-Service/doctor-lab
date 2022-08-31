import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'verify',
    language: 'EN',
    messages: {
        isNotVerify: {
            email: 'Email not verified',
            phone: 'Phone is not verified',
            noSendEmail: 'Unable to send you email',
            noSendSMS: 'Unable to send you SMS',
            code: 'Invalid code',
        },
    },
}
