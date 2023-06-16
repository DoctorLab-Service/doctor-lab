import { Button } from 'components/ui'

import { FC } from 'react'
import { FormBodyFooterProps } from 'types/props'
import { useTranslate } from 'utils/languages'

const FormBodyFooter: FC<FormBodyFooterProps> = ({ paths, pathWithRole, pagename, onClick, toVerification, toRegister, emptyForm, isAdmin }) => {
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
                disabled={(isRegister || isChangePassword || isForgot) && emptyForm}
                onClick={isRegister 
                    ? emptyForm ? undefined : toVerification 
                    : (isChangePassword || isForgot) && emptyForm ? undefined : onClick
                }
            />
            
            {
                !isLogin && <Button
                    size={!isForgot ? 'medium' : undefined}
                    type='link'
                    link={isVerification ? pathWithRole : paths.login}
                    onClick={isVerification ? toRegister : undefined}
                    text={linkText}
                />
            }

        </footer>    
    )
}

export default FormBodyFooter
