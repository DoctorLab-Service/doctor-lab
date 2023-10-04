import { paths as defaultPath } from 'core'
import { useLocation, useNavigate } from 'react-router-dom'
import { Paths, UsePaths } from 'types'
import { getPage } from './getPage'
import { RootState, setState, useAppDispatch, useAppSelector } from 'store'
import { IStateActionPayload } from 'store/types'

export const usePaths = (): UsePaths => {
    const dispatch = useAppDispatch()
    const state = useAppSelector((({ form: { state } }: RootState) => state))
    
    const { pathname, search } = useLocation()
    const navigate = useNavigate()

    const hostname = document.location.hostname.split('.')[0]
    const paths: Paths = defaultPath(hostname !== 'auth')

    const page = getPage(pathname)

    

    return { 
        page,
        state,
        paths,
        search,
        navigate,
        pathname,
        hostname,
        setState: (obj: IStateActionPayload) => dispatch(setState(obj)),
    }
}