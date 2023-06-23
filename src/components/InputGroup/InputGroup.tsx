import { FC } from "react"
import { InputGroupProps } from "types/props"
import { useTranslate } from "utils/languages"
import ChangePasswordFields from "./ChangePasswordFields"
import ForgotFields from "./ForgotFields"
import LoginFields from "./LoginFields"
import RegisterFields from "./RegisterFields"
import SupportFields from "./SupportFields"
import VerifiactionFields from "./VerifiactionFields"


const InputGroup: FC<InputGroupProps> = ({ pagename, setForm, setValidate }) => {
    const { translation: {
        core: { inputs }
    } } = useTranslate('auth', [['core', true]])


    const isLogin = pagename === 'login'
    const isRegister = pagename === 'register'
    const isForgot = pagename === 'forgot'
    const isSupport = pagename === 'support'
    const isVerification = pagename === 'verification'
    const isChangePassword = pagename === 'changePassword'

    return (
        <div className='input-group'>
            { 
                isLogin && <LoginFields
                    placeholders={inputs}
                    setForm={setForm}
                    setValidate={setValidate}
                />
            }
            { 
                isRegister && <RegisterFields
                    placeholders={inputs}
                    setForm={setForm}
                    setValidate={setValidate}
                />
            }
            { 
                isForgot && <ForgotFields
                    placeholders={inputs}
                    setForm={setForm}
                    setValidate={setValidate}
                />
            }
            { 
                isSupport && <SupportFields
                    placeholders={inputs}
                    setForm={setForm}
                />
            }
            { 
                isVerification && <VerifiactionFields
                    placeholders={inputs}
                    setForm={setForm}
                />
            }
            { 
                isChangePassword && <ChangePasswordFields
                    placeholders={inputs}
                    setForm={setForm}
                    setValidate={setValidate}
                />
            }
           
        </div>
    )
}

export default InputGroup