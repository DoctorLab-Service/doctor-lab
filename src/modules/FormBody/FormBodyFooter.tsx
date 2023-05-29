import { Button } from 'components/ui'
import { paths } from 'core'
import { FC } from 'react'
import { FormBodyFooterProps } from 'types/props'

const FormBodyFooter: FC<FormBodyFooterProps> = ({ pathWithRole, pagename, onClick }) => {
    const isLogin = pagename === 'login'
    const isRegister = pagename === 'register'
    const isForgot = pagename === 'forgot'
    const isSupport = pagename === 'support'
    const isVerification = pagename === 'verification'
    // const isChangePassword = pagename === 'changePassword'

    const buttonText = isLogin ? 'Sign In' : isRegister ? 'Create Account' : 'Submit'
    const linkText = isRegister 
        ? 'I have an account' : isSupport 
        ? 'Cancel' : isVerification 
        ? 'Back' : 'I remember the password'

    return (
        <footer className='form-body-footer'>
            {/* LOGIN */}
            { 
                isLogin && <div className='link-group'>
                    <Button
                        link={pathWithRole}
                        size='medium'
                        text='Have not account'
                    />
                    <Button
                        link={paths.forgot.password}
                        size='medium'
                        text='Forgot password?'
                    />
                </div>
            }

            <Button
                text={buttonText}
                variant='primary'
                size={!isLogin ? 'medium' : undefined}
                type='button'
                link={isRegister ? paths.verification.phone : undefined}
                fullSize
                onClick={onClick}
            />
            
            {
                !isLogin && <Button
                    size={!isForgot ? 'medium' : undefined}
                    variant='default'
                    link={paths.login}
                    text={linkText}
                />
            }

        </footer>    
    )
}

export default FormBodyFooter
