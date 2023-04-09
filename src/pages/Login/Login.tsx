import { FC } from 'react'
import { Background, Actions, Form, FormHeader, FormFooter } from 'modules'

import './index.sass'
import { useRoles } from 'hooks'

interface Props {
    darkMode: boolean
    toggleTheme: () => void
}

const Login: FC<Props> = ({ darkMode, toggleTheme }) => {
    const { roles, changeRole, currentRole } = useRoles()

    return (
        <div className='login'>
            <Background type='login' darkMode={darkMode}>
                <Actions toggleTheme={toggleTheme} darkMode={darkMode} />

                <div className='form-wrapper'>
                    <div className='form'>
                        <FormHeader 
                            darkMode={darkMode}
                            roles={roles}
                            changeRole={changeRole}
                        />

                        <Form currentRole={currentRole} />

                        <FormFooter />
                    </div>
                </div>

            </Background>
        </div>
    )
}

export default Login