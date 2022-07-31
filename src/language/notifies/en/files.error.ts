import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'files',
    language: 'EN',
    messages: {
        isNot: {
            upload: 'Failed to upload file(s)',
        },
        isEmpty: {
            upload: 'Upload file(s) missing',
        },
    },
}
