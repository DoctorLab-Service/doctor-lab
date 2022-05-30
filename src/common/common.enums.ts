/**
 * Base Admin can create and set success
 * Default Admin
 * Users cant create Admin role on one's own
 */
export enum EUserSuccess {
    Admin = 'Admin', //AC for owner (clinic) or main admin
    Custom = 'Custom', //AC owner can create or admin
    Manager = 'Manager', //AC
    Forbiden = 'Forbiden', // AC

    Marketing = 'Marketing', // A
    Support = 'Support', // A
    Finance = 'Finance', // A

    Assistant = 'Assistant', // D
    Doctor = 'Doctor', // D
    Dentist = 'Dentist', // D

    Patient = 'Patient', // P
}

/**
 * User can set gender
 * Default NotChosen
 */
export enum EUserGender {
    NotChosen = 'Not Choisen',
    Male = 'Male',
    Female = 'Female',
}

/**
 * User change Patient or clinic
 */
export enum EUserRoles {
    Patient = 'Patient',
    Clinic = 'Clinic',
    Admin = 'Admin',
}

/**
 * User can set custom lng, or set from client browser
 */
export enum ELanguage {
    RU = 'RU',
    EN = 'EN',
    KR = 'KR',
}
