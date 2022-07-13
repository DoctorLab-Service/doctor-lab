import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'roles',
    language: 'RU',
    messages: {
        isExists: {
            role: 'Роль уже существует',
        },
        isNotExist: {
            role: 'Роль не существует',
        },
        isLength: {
            role: 'Роль должна быть длиннее или равно 4 и не длиннее 32 символов',
            description: 'Роль должна должен быть не длиннее 255 символов',
        },
        isEmpty: {
            role: 'Роль не может быть пустой',
            all: 'Нет данных для обновления роли',
        },
        isNot: {
            foundRole: 'Роль не найдена',
            foundRoles: 'Ролей не найдено',
            createRole: 'Не удалось создать роль',
            updateRole: 'Не удалось обновить роль',
            deleteRole: 'Не удалось удалить роль',
        },
        permission: {
            createSystemRole: 'У вас нет прав для создания системной роли',
            updateSystemRole: (role: string): string => `У вас нет прав для изменения ${role} роли`,
            deleteSystemRole: (role: string): string => `У вас нет прав для удаления ${role} роли`,
        },
    },
}
