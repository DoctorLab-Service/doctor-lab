import { EmailSVG, PasswordSVG, GoogleSVG, FacebookSVG } from 'assets/icons'
import { FC, useState } from 'react'
import { Background, Actions } from 'modules'
import { Logo, Roles, TitleForm } from 'components'
import { Button, Input } from 'components/ui'
import { IResolveParams, LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login'

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
                                <li className='item circle'>
                                    <Button circle>
                                        <LoginSocialFacebook
                                            appId={'1648460842243016'}
                                            version={'v16.0'}
                                            fieldsProfile={
                                                'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                                            }
                                            // onLoginStart={onLoginStart}
                                            // onLogoutSuccess={onLogoutSuccess}
                                            // redirect_uri={REDIRECT_URI}
                                            onResolve={({ provider, data }: IResolveParams) => {
                                                console.log('provider', provider)
                                                console.log('data', data)
                                                // setProvider(provider)
                                                // setProfile(data)
                                            }}
                                            onReject={err => {
                                                console.log(err)
                                            }}
                                        >
                                            
                                                <FacebookSVG className='btn-icon' />
                                        </LoginSocialFacebook>
                                    </Button>

                                </li>
                                <li className='item circle'>
                                    <Button circle>
                                        <LoginSocialGoogle
                                            client_id={'1017899643553-d88n6jpsoquu8d9bp6s6f69nb38ito0p.apps.googleusercontent.com'}
                                            // onLoginStart={onLoginStart}
                                            // redirect_uri={REDIRECT_URI}
                                            scope="openid profile email"
                                            discoveryDocs="claims_supported"
                                            access_type="offline"
                                            onResolve={({ provider, data }: IResolveParams) => {
                                                console.log('provider', provider)
                                                console.log('data', data)
                                                // setProvider(provider)
                                                // setProfile(data)
                                            }}
                                            onReject={err => {
                                                console.log(err)
                                            }}
                                        >
                                            <GoogleSVG className='btn-icon' />
                                        </LoginSocialGoogle>
                                    </Button> 


                                    {/* <Button onClick={() => console.log('Continue With Google')} circle>
                                        <GoogleSVG className='btn-icon' />
                                    </Button> */}
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