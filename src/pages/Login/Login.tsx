import { EmailSVG, PasswordSVG, GoogleSVG } from 'assets/icons'
import { FC, useState } from 'react'
import { Background, Actions } from 'modules'
import { FacebookButton, Logo, Roles, TitleForm } from 'components'
import { Button, Input } from 'components/ui'

interface Props {
    darkMode: boolean
    toggleTheme: () => void
}



const Login: FC<Props> = ({ darkMode, toggleTheme }) => {

    const [statusField, setStatusField] = useState<'success' | 'error' | undefined>(undefined)

    function handleFacebookLogin(response) {
        // обрабатываете ответ
    }

    return (
        <div className='login'>
            <Background type='login' darkMode={darkMode}>
                <Actions toggleTheme={toggleTheme} darkMode={darkMode} />

                {/* <!-- START: FORM LOGIN --> */}
                <div className='form-wrapper'>
                    <div className='form'>
                        {/* <!-- START FORM LOGIN --> */}
                        <header className='form-header'>
                            <nav className='form-header-nav'>
                                <div className='form-header-logo circle'>
                                    <Logo darkMode={ darkMode } />
                                </div>
                                <Roles />
                            </nav>
                        </header>
                        {/* <!-- END FORM LOGIN --> */}


                        {/* <!-- START LOGIN FORM --> */}
                        <form className='form-body'>
                            <TitleForm title='Sign In' />

                            <div className='input-group'>
                                <Input
                                    id='email'
                                    status={statusField}
                                    image={<EmailSVG className='input-icon' />} // <PhoneSVG className='input-icon'/>
                                    placeholder='Email or Phone'
                                /> 
                                <Input 
                                    id='password'
                                    type='password'
                                    status={statusField}
                                    autoComplete='off'
                                    image={<PasswordSVG className='input-icon' />}
                                    placeholder='Password'/>
                            </div>

                            <footer className='form-body-footer'>
                                <div className='link-group'>
                                    <Button
                                        link='/register'
                                        size='medium'
                                        text='Have not account'
                                    />  
                                    <Button
                                        link='/forgot'
                                        size='medium'
                                        text='Forgot password?'
                                    />  
                                </div>

                                <Button
                                    text='Sign In'
                                    variant='primary'
                                    onClick={() => console.log('Sign In Button')}
                                    fullSize
                                />                                
                                
                            </footer>
                        </form>
                        {/* <!-- END LOGIN FORM --> */}


                        {/* <!-- START FORM LOGIN --> */}
                        <footer className='form-footer'>
                            <ul className='social'>
                                {/* <FacebookLogin
                                    appId='1295097498019777'
                                    fields='name,email,picture'
                                    callback={handleFacebookLogin}
                                    render={renderProps => (
                                        <Button onClick={renderProps.onClick} circle>
                                            <FacebookSVG className='btn-icon' />
                                        </Button>
                                    )}
                                    autoLoad={false}
                                /> */}
                                <li className='item circle'>
                                    <FacebookButton circle />
                                    {/* <Button onClick={() => console.log('Continue With Facebook')} circle>
                                        <FacebookSVG className='btn-icon' />
                                    </Button> */}
                                </li>
                                <li className='item circle'>
                                    <Button onClick={() => console.log('Continue With Google')} circle>
                                        <GoogleSVG className='btn-icon' />
                                    </Button>
                                </li>
                            </ul>
                        </footer>
                        {/* <!-- END FORM LOGIN --> */}
                    </div>
                </div>
                {/* <!-- END: FORM LOGIN --> */}
            </Background>
        </div>
    )
}

Login.defaultProps = {
    darkMode: false,
}

export default Login