import { usePaths, useRoles } from "hooks"
import { FC } from "react"
import { Roles } from "types/core"
import { FormBodyHeaderProps } from "types/props"
import { useTranslate } from "utils/languages"

const FormBodyHeader: FC<FormBodyHeaderProps> = ({ formState }) => {
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

    const { pagename } = usePaths()
    const { currentRole } = useRoles()
    
    const isLogin = pagename === 'login'
    const isRegister = pagename === 'register'
    const isForgot = pagename === 'forgot'
    const isSupport = pagename === 'support'
    const isVerification = pagename === 'verification'
    const isChangePassword = pagename === 'changePassword'

    const titleText = {
        login: (role: string | Roles) => `${login.title} ${role}`,
        forgot: forgot.title,
        changePassword: changePassword.title,
        register: (role: string | Roles) => `${register.title} ${role}`,
        support: support.title,
        verification: verification.title,
    }
    const bodyText = {
        forgot: forgot.info,
        changePassword: changePassword.info,
        support: support.info,
        verification: verification.info,
    }

    return (
        <header className='form-body-header'>
            <h1 className='form-body-title'>
                {
                    isRegister || isLogin ? titleText[pagename](currentRole.value) : titleText[pagename]
                }
            </h1>
            {
                (isForgot || isChangePassword || isSupport || isVerification) 
                && <span className="form-body-text">{bodyText[pagename]}</span>
            }
            {
                isVerification && <div className="form-body-text-group">
                    <span className="form-body-text">{verification.infoGroup[0]}</span>
                    <span className="form-body-text form-body-text-number">{formState && formState}</span>
                    <span className="form-body-text">{verification.infoGroup[1]}</span>
                </div>
            }
        </header>
    )
}

export default FormBodyHeader