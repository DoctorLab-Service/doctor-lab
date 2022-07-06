import { NotifyDto } from 'src/language/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'roles',
    language: 'EN',
    messages: {
        isExist: {
            role: 'Role already exists',
        },
        isLength: {
            role: 'Role must be longer than or equal to 4 and no longer than 64 characters',
            roleName: 'New role name must be longer than or equal to 4 and no longer than 64 characters',
            description: 'Role must be no longer than 255 characters',
        },
        isEmpty: {
            role: "Role can't be empty",
        },
        isNotFound: {
            role: 'The role is not found',
        },
        isNot: {
            createRole: "Couldn't create role",
            updateRole: "Couldn't update role",
            deleteRole: "Couldn't deleted role",
        },
    },
}
