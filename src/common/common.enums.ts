/**
 * Base Admin can create and set success
 * Default Admin
 * Users cant create Admin role on one's own
 */
export enum EUserAdminSuccess {
    Admin = 'Admin',
    Custom = 'Custom',
    Manager = 'Manager',
    Marketing = 'Marketing',
    Support = 'Support',
    Finance = 'Finance',
    Forbiden = 'Forbiden',
}
/**
 * Base Admin can create and set success
 * Default Doctor
 */
export enum EUserClinicAccess {
    Admin = 'Admin', // for owner
    Assistant = 'Assistant',
    Custom = 'Custom', // owner can create
    Doctor = 'Doctor',
    Dentist = 'Dentist', // doctor
    Manager = 'Manager',
    Forbiden = 'Forbiden',
}
/**
 * Set automaticly if role Patient
 */
export enum EUserPatient {
    Patient = 'Patient',
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
