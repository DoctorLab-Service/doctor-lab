import { UseAuth } from 'types'
import { usePaths } from 'hooks'
import { isAuth } from 'core/graphql'
import { localStorageKey } from 'core/localstorage'

export const useAuth = (): UseAuth => {
    const { paths } = usePaths()
    
    const redirectToApp = () => document.location.href = process.env.REACT_APP_APP_URI || paths.main
    
    const setToken = (token: string): void => {
        localStorage.setItem(localStorageKey.token, token)
    }
    const removeToken = (): void => {
        localStorage.removeItem(localStorageKey.token)
    }

    const authentication = (token: string): void => {
        if (token) {
            setToken(token)
            isAuth(true)
            redirectToApp()
        }
    }
    const logout = (): void => {
        removeToken()
        isAuth(false)
        document.location.pathname = paths.login
    }


    return {
        logout,
        setToken,
        removeToken,
        redirectToApp,
        authentication,
        isAuth: isAuth(),
    }
}