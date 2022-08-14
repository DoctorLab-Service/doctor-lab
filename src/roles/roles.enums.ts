/**
 * User change Patient or clinic
 */
export enum EDefaultRoles {
    patient = 'patient',
    doctor = 'doctor',
    admin = 'admin',
}

/**
 * System roles
 */
export enum ESystemsRoles {
    super_admin = 'super_admin',
    // owner = 'doctor',
}

/**
 * Roles type
 */
export enum ERolesType {
    system = 'system',
    custom = 'custom',
    // owner = 'owner',
}
