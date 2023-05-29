import { paths } from "core"
import { useLocation } from "react-router-dom"
import { UsePathname } from "types"

export const usePathname = (): UsePathname => {
    const { pathname } = useLocation()
    
    let pagename =  
        pathname === paths.main || pathname === paths.auth || pathname === paths.login ? 'login'
        : pathname === paths.register.patient || pathname === paths.register.doctor.doctor || pathname === paths.register.doctor.dentist ? 'register'
        : pathname === paths.cahnge.password ? 'changePassword'
        : pathname === paths.forgot.password ? 'forgot'
        : pathname === paths.support ? 'support'
        : pathname === paths.verification.phone || pathname === paths.verification.password ? 'verification'
        : 'login'

    return { pathname, pagename }
}