import { paths as defaultPath } from "core"
import { useLocation, useNavigate } from "react-router-dom"
import { Paths, UsePaths } from "types"

export const usePaths = (): UsePaths => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()

    const hostname = document.location.hostname.split('.')[0]
    const paths: Paths = defaultPath(hostname !== 'auth')

    const pagename =  
        pathname === paths.main || pathname === paths.auth || pathname === paths.login ? 'login'
        : pathname === paths.register.patient || pathname === paths.register.doctor.doctor || pathname === paths.register.doctor.dentist ? 'register'
        : pathname === paths.cahnge.password ? 'changePassword'
        : pathname === paths.forgot.password ? 'forgot'
        : pathname === paths.support ? 'support'
        : pathname === paths.verification.phone || pathname === paths.verification.password ? 'verification'
        : 'login'


    return { 
        state,
        paths,
        navigate,
        pathname,
        pagename,
        hostname,
    }
}