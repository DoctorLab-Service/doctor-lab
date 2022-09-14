import { RelationsConfig } from './types'

export const relationsConfig: RelationsConfig = {
    users: { relations: ['roles', 'createdRoles', 'setRoles', 'helpMessage'] },
    roles: { relations: ['user'] },
    verifications: { relations: ['user'] },
    help: { relations: ['user', 'answers'] },
}
