import { FC } from 'react'
import { usePaths, useRoles } from 'hooks'
import { FormProps } from 'types/props'
import FormFooter from './FormFooter'
import FormHeader from './FormHeader'
import { FormBody } from 'modules'

const Form: FC<FormProps> = ({ darkMode }) => {
    const { roles, changeRole } = useRoles()
    const { pagename } = usePaths()

    const isLogin = pagename === 'login'

    return (
        <div className='form-wrapper'>
            <div className='form'>

                {
                    isLogin && 
                        <FormHeader
                            darkMode={darkMode}
                            roles={roles}
                            changeRole={changeRole}
                        />
                }

                <FormBody />


                {
                    isLogin && <FormFooter />
                }

            </div>
        </div>
  )
}

export default Form
