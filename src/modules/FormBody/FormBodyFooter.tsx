import { Button } from 'components/ui'
import { usePaths } from 'hooks'

import { FC } from 'react'
import { FormBodyFooterProps } from 'types/props'
import { useTranslate } from 'utils/languages'

const FormBodyFooter: FC<FormBodyFooterProps> = ({ pathWithRole, pagename, onClick, toRegister, toVerification, emptyForm, isAdmin, mutations }) => {
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
    const { paths } = usePaths()

    const { mutation, loading } = mutations

    const isLogin = pagename === 'login'
    const isRegister = pagename === 'register'
    const isForgot = pagename === 'forgot'
    const isSupport = pagename === 'support'
    const isVerification = pagename === 'verification'
    const isChangePassword = pagename === 'changePassword'

    const buttonText = isLogin
        ? login.buttons.submit : isRegister
            ? register.buttons.submit : isForgot
                ? forgot.buttons.submit : isSupport
                    ? support.buttons.submit : isVerification
                        ? verification.buttons.submit : changePassword.buttons.submit

    const linkText = isRegister
        ? register.links.login : isForgot
            ? forgot.links.back : isSupport
                ? support.links.cancel : isVerification
                    ? verification.links.back : changePassword.links.back



    const handleClick = async (e): Promise<void> => {
        if (isLogin) {
            onClick(e, mutation._login)
        } 
        if (isRegister) {
            onClick(e, mutation._createAccount)
            console.log('A verification code has been sent to your phone number')
            setTimeout(() => toVerification(), 3000)
        }
        if (isVerification) {
            onClick(e, mutation._verificationPhone)
        }
        if (isForgot) {
            onClick(e, mutation._passwordRecoveryCode)
        }
        if (isSupport) {
            onClick(e, mutation._createHelpMessage)            
        }
        if (isChangePassword) {
            onClick(e, mutation._changePassword)
        }
        onClick(e)
    }



    return (
        <footer className='form-body-footer'>
            {/* LOGIN */}
            {
                isLogin && <div className='link-group'>
                    <Button
                        link={pathWithRole}
                        size='medium'
                        text={login.links.register}
                        disabled={isAdmin}
                    />
                    <Button
                        link={paths.forgot.password}
                        size='medium'
                        text={login.links.forgot}
                    />
                </div>
            }

            <Button
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

            {
                !isLogin && <Button
                    size={!isForgot ? 'medium' : undefined}
                    type='link'
                    link={isVerification ? undefined : paths.login}
                    onClick={isVerification ? toRegister : undefined}
                    text={linkText}
                />
            }

        </footer>
    )
}

export default FormBodyFooter
