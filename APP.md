## ROLES

Default roles params

``` javascript

export enum EDefaultRoles {
    patient = 'patient',
    doctor = 'doctor',
    dentist = 'dentist',
    admin = 'admin',
}

export enum ESystemsRoles {
    super_admin = 'super_admin',
    // owner = 'doctor',
}

export enum ERolesType {
    system = 'system',
    custom = 'custom',
    // owner = 'owner',
}

```


## Errors
Errors key name
- errors 
    > errors
- [fields_name] 
    > Input field errors
- auth 
    > auth errors
- upload_file 
    > upload file errors
- exists 
    > exists 
- not_exists 
    > no_exists errors, use in cheking to exist
- permission 
    > permission errors
- not_found 
    > found errors, using if not found data in database (user, role ...)
- create 
    > create errors
- update 
    > update errors
- delete 
    > delete errors
- no_send 
    > end errors, using for sending mail, sms
- verify 
    > verify errors, using  for verifying email, phone, etc.
- change 
    > / change errors for chenging data
