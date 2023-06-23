import { UseAuth } from 'types'
import { usePaths } from 'hooks'
import { isAuth } from 'core/graphql'
import { localStorageKey } from 'core/localstorage'

export const useAuth = (): UseAuth => {
    const { paths } = usePaths()
    
    const redirectToApp = () => document.location.href = process.env.REACT_APP_APP_URI || paths.main
 
    const authentication = (token: string): void => {
        if (token) {
            console.log(token)
            localStorage.setItem(localStorageKey.token, token)
            isAuth(true)
            redirectToApp()
        }
    }
    const logout = (): void => {
        localStorage.removeItem(localStorageKey.token)
        isAuth(false)
        document.location.pathname = paths.login
    }
    return {
        authentication,
        logout,
        isAuth: isAuth(),
        redirectToApp
    }
}