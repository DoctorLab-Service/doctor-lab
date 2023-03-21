import { FC } from 'react'
import { Background, Actions, Form, FormHeader, FormFooter } from 'modules'

interface Props {
    darkMode: boolean
    toggleTheme: () => void
}

const Login: FC<Props> = ({ darkMode, toggleTheme }) => {

    return (
        <div className='login'>
            <Background type='login' darkMode={darkMode}>
                <Actions toggleTheme={toggleTheme} darkMode={darkMode} />

                <div className='form-wrapper'>
                    <div className='form'>
                        <FormHeader darkMode={darkMode} />

                        <Form />

                        <FormFooter />
                    </div>
                </div>

            </Background>
        </div>
    )
}

export default Login