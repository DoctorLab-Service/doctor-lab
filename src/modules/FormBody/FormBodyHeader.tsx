import { FC } from "react"
import { Roles } from "types/core"
import { FormBodyHeaderProps } from "types/props"

const FormBodyHeader: FC<FormBodyHeaderProps> = ({ pagename, currentRole }) => {
    const isLogin = pagename === 'login'
    const isRegister = pagename === 'register'
    const isForgot = pagename === 'forgot'
    const isSupport = pagename === 'support'
    const isVerification = pagename === 'verification'
    const isChangePassword = pagename === 'changePassword'

    const title = {
        login: (role: Roles) => `Sign In as ${role[0].toUpperCase() + role.slice(1).toLowerCase()}`,
        forgot: 'Forgot password',
        changePassword: 'Change password',
        register: (role: Roles) => `Sign Up as ${role[0].toUpperCase() + role.slice(1).toLowerCase()}`,
        support: 'Support',
        verification: 'Verification',
    }
    const bodyText = {
        forgot: 'Enter the email or phone to which your account was registered to reset your password',
        changePassword: 'After changing the password, you can \n use its login for your account.',
        support: 'Enter the question to which you will receive an answer to the specified email',
        verification: 'A token has been sent to your email to confirm your mail. Email confirmation will allow you to use it to log into your',
    }

    return (
        <header className='form-body-header'>
            <h1 className='form-body-title'>
                {
                    isRegister || isLogin ? title[pagename](currentRole) : title[pagename]
                }
            </h1>
            {
                (isForgot || isChangePassword || isSupport || isVerification) 
                && <span className="form-body-text">{bodyText[pagename]}</span>
            }
            {
                isVerification && <div className="form-body-text-group">
                    <span className="form-body-text">A verification code has been sent to your number</span>
                    <span className="form-body-text form-body-text-number">+380990005555</span>
                    <span className="form-body-text">Enter it to verify your number.</span>
                </div>
            }
        </header>
    )
}

export default FormBodyHeader