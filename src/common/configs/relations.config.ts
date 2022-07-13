import { RelationsConfig } from './types'

export const relationsConfig: RelationsConfig = {
    users: { relations: ['roles', 'createdRoles'] },
    roles: { relations: ['user'] },
    verifications: { relations: ['user'] },
}
