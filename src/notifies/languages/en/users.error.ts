import { NotifyDto } from 'src/notifies/dtos/notify.dto'

export const notifies: NotifyDto = {
    serviceName: 'users',
    language: 'en',
    messages: {
        exist: {
            phone: 'There is user with that phone already',
            email: 'There is user with that email already',
        },
        field: {
            fullname: 'Enter your name',
            experience: 'Enter your experience',
            phone: 'Enter your phone',
            email: 'Enter your email',
            password: 'Enter password',
            rePassword: 'Please repeat your password',
            passwordEqual: "Passwords don't match",
        },
    },
}
