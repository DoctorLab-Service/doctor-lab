export enum EUserAdminSuccess {
    Admin = 'Admin',
    Custom = 'Custom',
    Manager = 'Manager',
    Marketing = 'Marketing',
    Support = 'Support',
    Finance = 'Finance',
    Forbiden = 'Forbiden',
}
export enum EUserClinicAccess {
    Admin = 'Admin', // for owner
    Assistant = 'Assistant',
    Custom = 'Custom', // owner can create
    Doctor = 'Doctor',
    Dentist = 'Dentist', // doctor
    Manager = 'Manager',
    Forbiden = 'Forbiden',
}
export enum EUserGender {
    NotChosen = 'Not Choisen',
    Male = 'Male',
    Female = 'Female',
}
export enum EUserPatient {
    Patient = 'Patient',
}
export enum EUserRoles {
    Patient = 'Patient',
    Clinic = 'Clinic',
    Admin = 'Admin',
}

export enum ELanguage {
    RU = 'RU',
    EN = 'EN',
    KR = 'KR',
}
