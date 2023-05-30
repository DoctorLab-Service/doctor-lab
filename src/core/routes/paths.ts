import { Paths } from "types"

const codes = {
    register: '/r',
    forgot: '/f', 
    cahnge: '/c', 
    verify: '/v',
}
const gPaths = {
    main: '/',
    auth: '/auth'
}

const isAuth = (auth = false): string => auth ? gPaths.auth : ''


export const paths = (auth = false): Paths => ({
    main: gPaths.main,
    auth: gPaths.auth,
    login: `${isAuth(auth)}/login`,
    register: {
        register: `${isAuth(auth) }${codes.register}`,
        patient: `${isAuth(auth) }${codes.register}/patient`,
        doctor: {
            doctor: `${isAuth(auth) }${codes.register}/doctor`,
            dentist: `${isAuth(auth) }${codes.register}/dentist`,
            // ... other paths for doctors.
        },
    },
    forgot: {
        phone: `${isAuth(auth)}${codes.forgot}/phone`,
        password: `${isAuth(auth)}${codes.forgot}/password`,
    },
    cahnge: {
        // phone: `${isAuth(auth)}${codes.cahnge}/phone`,
        password: `${isAuth(auth)}${codes.cahnge}/password`,
    },
    verification: {
        phone: `${isAuth(auth)}${codes.verify}/phone`,
        password: `${isAuth(auth)}${codes.verify}/password`,
    },
    support: '/support',
    privacyPolicy: '/privacy-policy',
    termOfUse: '/term-of-use',
})