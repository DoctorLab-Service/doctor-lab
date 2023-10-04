import { paths as defaultPath } from 'core'
import { Page, Paths } from "types"
import { FormType } from 'types/core'


export const getPage = (path?: string): Page => {
    const pathname = path || window.location.pathname

    const hostname = document.location.hostname.split('.')[0]
    const paths: Paths = defaultPath(hostname !== 'auth')

    const vPath = (localPath): boolean => {
        const result = pathname.match(new RegExp(`^${localPath}$`, 'g'))
        if(result === null ) return false
        return Boolean(result.length)
    }

    let pagename: FormType = 'login'
    if (vPath(paths.main) || vPath(paths.auth) || vPath(paths.login)) 
        pagename ='login'

    if (vPath(paths.register.patient) || vPath(paths.register.doctor.doctor) || vPath(paths.register.doctor.dentist)) 
        pagename ='register'

    if (vPath(paths.cahnge.password)) 
        pagename ='changePassword'

    if (vPath(paths.forgot.password)) 
        pagename ='forgot'

    if (vPath(paths.support)) 
        pagename ='support'

    if (vPath(paths.verification.phone)) 
        pagename ='verification'

    if (vPath(paths.verification.password)) 
        pagename ='recoveryPassword'

    const isLogin = pagename === 'login'
    const isRegister = pagename === 'register'
    const isForgot = pagename === 'forgot'
    const isSupport = pagename === 'support'
    const isVerification = pagename === 'verification'
    const isChangePassword = pagename === 'changePassword'
    const isRecoveryPassword = pagename === 'recoveryPassword'
    
    return {
        pagename,
        isLogin,
        isRegister,
        isForgot,
        isSupport,
        isVerification,
        isChangePassword,
        isRecoveryPassword,
    }
}


// ! TEST v1
// Определите объект с путями и соответствующими pagename
// const pathToPagenameMap = {
//     '/': 'login',
//     '/login': 'login',
//     '/register/patient': 'register',
//     '/register/doctor/doctor': 'register',
//     '/register/doctor/dentist': 'register',
//     '/changePassword': 'changePassword',
//     '/forgot/password': 'forgot',
//     '/support': 'support',
//     '/verification/phone': 'verification',
//     '/verification/password': 'recoveryPassword',
// };

// export const getPagename = (path?: string): FormType => {
//     const pathname = path || window.location.pathname;
//     const pagename = pathToPagenameMap[pathname] || 'login'; // Используйте значение по умолчанию, если не найдено соответствие

//     return pagename;
// };

// ! TEST v2
// export const getPagename = (path?: string): FormType => {
//     const pathname = path || window.location.pathname;
//     const hostname = document.location.hostname.split('.')[0];
//     const paths: Paths = defaultPath(hostname !== 'auth');

//     const pathToPage = {
//         [paths.main]: 'login',
//         [paths.auth]: 'login',
//         [paths.login]: 'login',
//         [paths.register.patient]: 'register',
//         [paths.register.doctor.doctor]: 'register',
//         [paths.register.doctor.dentist]: 'register',
//         [paths.cahnge.password]: 'changePassword',
//         [paths.forgot.password]: 'forgot',
//         [paths.support]: 'support',
//         [paths.verification.phone]: 'verification',
//         [paths.verification.password]: 'recoveryPassword',
//     };

//     const foundPage = Object.entries(pathToPage).find(([pathKey]) => vPath(pathKey));
    
//     return foundPage ? foundPage[1] : 'login';
// };
