export enum UserAdminSuccess {
    Admin,
    Custom,
    Manager,
    Marketing,
    Support,
    Finance,
    Forbiden,
}
export enum UserClinicAccess {
    Admin, // for owner
    Assistant,
    Custom, // owner can create
    Doctor,
    Dentist, // doctor
    Manager,
    Forbiden,
}
export enum UserGender {
    Male,
    Female,
}
export enum UserPatient {
    Patient,
}
export enum UserRoles {
    Patient,
    Clinic,
    Admin,
}
