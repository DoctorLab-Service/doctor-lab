import { FC } from "react"
import { InputGroupProps } from "types/props"
import { useTranslate } from "utils/languages"
import ChangePasswordFields from "./ChangePasswordFields"
import ForgotFields from "./ForgotFields"
import LoginFields from "./LoginFields"
import RegisterFields from "./RegisterFields"
import SupportFields from "./SupportFields"
import VerifiactionFields from "./VerifiactionFields"
import { usePaths } from "hooks"


const InputGroup: FC<InputGroupProps> = () => {
    const { translation: { 
        core: { inputs }
    } } = useTranslate('auth', [['core', true]])

    const { page: { isLogin, isRegister, isForgot, isSupport, isVerification, isChangePassword } } = usePaths()

    return (
        <div className='input-group'>
            { isLogin && <LoginFields placeholders={inputs} /> }
            { isRegister && <RegisterFields placeholders={inputs} /> }
            { isForgot && <ForgotFields placeholders={inputs} /> }
            { isSupport && <SupportFields placeholders={inputs} /> }
            { isVerification && <VerifiactionFields placeholders={inputs} /> }
            { isChangePassword && <ChangePasswordFields placeholders={inputs} /> }
           
        </div>
    )
}

export default InputGroup