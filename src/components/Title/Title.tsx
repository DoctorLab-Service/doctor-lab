import { usePaths, useRoles } from 'hooks'
import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { TitleProps } from 'types/props'
import { useTranslate } from 'utils/languages'

const Title: FC<TitleProps> = () => {
    const { translation: {
        login, forgot, changePassword, register, support, verification
    } } = useTranslate('auth', [
        ['login', true],
        ['forgot', true],
        ['changePassword', true],
        ['register', true],
        ['support', true],
        ['verification', true]
    ])
    
    const { page: { isLogin, isRegister, isForgot, isSupport, isVerification } } = usePaths()
    const { currentRole } = useRoles()


    const pageTitle = isLogin
        ? `${login.title} ${currentRole.value}` : isRegister
        ? `${register.title} ${currentRole.value}` : isForgot
        ? forgot.title : isSupport
        ? support.title : isVerification
        ? verification.title : changePassword.title
    

    return (
        <Helmet>
            <title>Doctor Lab Service - {pageTitle}</title>
        </Helmet>
    )
}

export default Title
