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
            all: 'Role update data missing',
        },
        isNotFound: {
            role: 'The role is not found',
        },
        isNot: {
            createRole: "Couldn't create role",
            updateRole: "Couldn't update role",
            deleteRole: "Couldn't deleted role",
        },
        permission: {
            createSystemRole: 'You do not have permission to create the system role',
            updateSystemRole: (role: string): string => `You do not have permission to update the ${role} role`,
            deleteSystemRole: (role: string): string => `You do not have permission to remove the ${role} role`,
        },
    },
}
