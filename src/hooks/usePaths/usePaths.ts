import { paths as defaultPath } from 'core'
import { useLocation, useNavigate } from 'react-router-dom'
import { Paths, UsePaths } from 'types'
import { getPagename } from './getPagename'

export const usePaths = (): UsePaths => {
    const { pathname, state } = useLocation()
    const navigate = useNavigate()

    const hostname = document.location.hostname.split('.')[0]
    const paths: Paths = defaultPath(hostname !== 'auth')

    const pagename = getPagename(paths, pathname)

    return { 
        state,
        paths,
        navigate,
        pathname,
        pagename,
        hostname,
    }
}