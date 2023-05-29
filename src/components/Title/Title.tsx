import { usePathname, useRoles } from 'hooks'
import { Helmet } from 'react-helmet-async'

const Title = () => {
    const { pagename } = usePathname()
    const { currentRole } = useRoles()

    const upperPagename = pagename[0].toUpperCase() + pagename.slice(1).toLowerCase()
    const upperCurrentRole = currentRole[0].toUpperCase() + currentRole.slice(1).toLowerCase()
    
    const pageTitle = pagename === 'register' 
        ? `Sign Up as ${upperCurrentRole}` 
        : pagename === 'changePassword' 
            ? 'Change Password' 
            : upperPagename
    

    return (
        <Helmet>
            <title>Doctor Lab Service - {pageTitle}</title>
        </Helmet>
    )
}

export default Title
