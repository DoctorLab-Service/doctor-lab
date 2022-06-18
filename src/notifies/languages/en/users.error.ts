import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'users',
    language: 'EN',
    messages: {
        isExist: {
            phone: 'There is user with that phone already',
            email: 'There is user with that email already',
        },
        isNotExist: {
            phone: 'No user found with this phone number',
            email: 'User with this email address not found',
        },
        isEmpty: {
            rePassword: 'Please repeat your password',
        },
        isLength: {
            fullname: 'Fullname must be longer than or equal to 3 characters',
            country: 'Country must be no longer than 64 characters',
            state: 'State must be no longer than 64 characters',
            address: 'Address must be no longer than 64 characters',
            email: 'Email must be longer than or equal to 3 characters',
            experience: 'Experianse must be longer than or equal to 3 characters',
            password: 'Password must be longer than or equal to 6 characters',
        },
        isValid: {
            phone: 'Invalid phone number',
            email: 'Invalid email address',
            passwordEqual: "Passwords don't match",
        },
        isNotFound: {
            user: 'The user is not found',
            users: 'Usr found',
        },
        isNotCreate: {
            user: "Couldn't create account",
        },
    },
}
