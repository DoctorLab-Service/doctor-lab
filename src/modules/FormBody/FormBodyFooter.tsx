import { Button } from 'components/ui'
import { useDarkMode, useForm, usePaths, useRoles } from 'hooks'

import { FC, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from 'store'
import { FormBodyFooterProps } from 'types/props'
import { useTranslate } from 'utils/languages'

const FormBodyFooter: FC<FormBodyFooterProps> = ({ onClick, emptyForm, isAdmin, mutations, }) => {
    const [loading, setLoading] = useState(false)

    const { translation: {
        login, forgot, changePassword, register, support, verification, recoveryPassword,
    } } = useTranslate('auth', [
        ['login', true],
        ['forgot', true],
        ['changePassword', true],
        ['register', true],
        ['support', true],
        ['verification', true],
        ['recoveryPassword', true],
    ])
    
    const { pathWithRole } = useRoles()
    const { resetForm } = useForm()
    const { resetTransition } = useDarkMode()

    const { 
        paths,
        page: {
            isLogin,
            isRegister,
            isForgot,
            isSupport,
            isVerification,
            isChangePassword,
            isRecoveryPassword,
        },
        navigate
    } = usePaths()

    // Redux store
    const { confirmEmail } = useAppSelector(({ form }: RootState) => form)

    const buttonText = isLogin ? login.buttons.submit 
        : isRegister ? register.buttons.submit
        : isForgot ? forgot.buttons.submit
        : isSupport ? support.buttons.submit
        : isVerification ? verification.buttons.submit
        : isChangePassword ? changePassword.buttons.submit
        : recoveryPassword.buttons.submit

    const linkText = isRegister ? register.links.login
        : isForgot ? forgot.links.back 
        : isSupport ? support.links.cancel
        : isVerification ? verification.links.back
        : isChangePassword ? changePassword.links.back
        : recoveryPassword.links[confirmEmail.status ? 'cancel' : 'back']



    const handleClick = async (e): Promise<void> => {
        let mutationName = isLogin ? 'login'
            : isRegister ? 'createAccount'
            : isVerification ? 'verificationPhone'
            : isForgot ? 'passwordRecoveryCode'
            : isSupport  ? 'createHelpMessage' 
            : isChangePassword ? 'changePassword'
            : isRecoveryPassword && 'verificationPasswordRecovery'


        if (mutationName.length) {
            const { mutation, loading } = mutations[mutationName]
            onClick(e, mutation)
            setLoading(loading)
            return
        } 
        
        onClick(e)
        return
    }
    const handleLinkClick = (): string => {
        resetForm()
        resetTransition()

        return navigate(isVerification ? pathWithRole : paths.login)
    }

    const ButtonJSX = <Button
        text={buttonText}
        variant='primary'
        size={!isLogin ? 'medium' : undefined}
        type='button'
        fullSize
        loading={loading}
        disabled={emptyForm}
        onClick={isRegister
            ? emptyForm ? undefined : handleClick
            : ((isLogin || isChangePassword || isForgot) && emptyForm) || loading ? undefined : handleClick
        }
    />

    return (
        <footer className='form-body-footer'>
            {/* LOGIN */}
            {
                isLogin && <div className='link-group'>
                    <Button
                        link={pathWithRole}
                        size='medium'
                        text={login.links.register}
                        onClick={() => resetForm()}
                        disabled={isAdmin}
                        />
                    <Button
                        link={paths.forgot.password}
                        size='medium'
                        text={login.links.forgot}
                        onClick={() => resetForm()}
                        
                    />
                </div>
            }

            { 
                !isRecoveryPassword  ? ButtonJSX : confirmEmail.status ? ButtonJSX : undefined
            }

            {
                !isLogin && <Button
                    size={!isForgot ? 'medium' : undefined}
                    type='link'
                    onClick={handleLinkClick}
                    text={linkText}
                />
            }

        </footer>
    )
}

export default FormBodyFooter
