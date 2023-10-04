import { usePaths, useRoles } from "hooks"
import { FC } from "react"
import { RootState, useAppSelector } from "store"
import { Roles } from "types/core"
import { FormBodyHeaderProps } from "types/props"
import { useTranslate } from "utils/languages"

const FormBodyHeader: FC<FormBodyHeaderProps> = ({ formState }) => {
    const { translation: {
        login, forgot, changePassword, register, support, verification, recoveryPassword
    } } = useTranslate('auth', [
            ['login', true],
            ['forgot', true],
            ['changePassword', true],
            ['register', true],
            ['support', true],
            ['verification', true],
            ['recoveryPassword', true],
        ])

    const { page: { pagename, isLogin, isRegister, isForgot, isSupport, isVerification, isChangePassword, isRecoveryPassword } } = usePaths()
    const { currentRole } = useRoles()

    // Redux store
    const confirmEmail = useAppSelector(({ form }: RootState) => form.confirmEmail)
    
    const titleText = {
        login: (role: string | Roles) => `${login.title} ${role}`,
        forgot: forgot.title,
        changePassword: changePassword.title,
        register: (role: string | Roles) => `${register.title} ${role}`,
        support: support.title,
        verification: verification.title,
        recoveryPassword: recoveryPassword.title[confirmEmail.status ? 'default' : 'failed'],
    }
    const bodyText = {
        forgot: forgot.info,
        changePassword: changePassword.info,
        support: support.info,
        verification: verification.info,
        recoveryPassword: recoveryPassword.info[confirmEmail.status ? 'default' : 'failed'],
    }

    return (
        <header className='form-body-header'>
            <h1 className='form-body-title'>
                {
                    isRegister || isLogin ? titleText[pagename](currentRole.value) : titleText[pagename]
                }
            </h1>
            {
                (isForgot || isChangePassword || isSupport || isVerification || isRecoveryPassword) 
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