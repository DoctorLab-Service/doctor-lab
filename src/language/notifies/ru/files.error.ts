import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'files',
    language: 'RU',
    messages: {
        isNot: {
            upload: 'Ошибка загрузки файла(ов)',
        },
        isEmpty: {
            upload: 'Выберите файл для загрузки',
        },
    },
}
