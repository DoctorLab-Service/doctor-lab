const codes = {
    register: '/r',
    step: '/s', 
    forgot: '/f', 
    cahnge: '/c', 
    verify: '/v',
}
const gPaths = {
    main: '/',
    auth: '/auth'
}

export const paths = {
    main: gPaths.main,
    auth: gPaths.auth,
    login: `${gPaths.auth}/login`,
    register: {
        register: `${gPaths.auth}${codes.register}`,
        patient: `${gPaths.auth}${codes.register}/patient`,
        doctor: {
            doctor: `${gPaths.auth}${codes.register}/doctor`,
            dentist: `${gPaths.auth}${codes.register}/dentist`,
            // ... other paths for doctors.
        },
    },
    step: (step: number): string => `${codes.forgot}-${step}`,
    forgot: {
        phone: `${gPaths.auth}${codes.forgot}/phone`,
        password: `${gPaths.auth}${codes.forgot}/password`,
    },
    cahnge: {
        phone: `${gPaths.auth}${codes.cahnge}/phone`,
        password: `${gPaths.auth}${codes.cahnge}/password`,
    },
    verify: {
        phone: `${gPaths.auth}${codes.verify}/phone`,
        password: `${gPaths.auth}${codes.verify}/password`,
    },
    help: '/help',
    privacyPolicy: '/privacy-policy',
    termOfUse: '/term-of-use',
}