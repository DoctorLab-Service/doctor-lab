import { FC } from 'react'
import { usePathname, useRoles } from 'hooks'
import { FormProps } from 'types/props'
import FormFooter from './FormFooter'
import FormHeader from './FormHeader'
import { FormBody } from 'modules'

const Form: FC<FormProps> = ({ darkMode }) => {
    const { roles, changeRole, currentRole } = useRoles()
    const { pagename } = usePathname()

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

                <FormBody currentRole={currentRole} pagename={pagename} />


                {
                    isLogin && <FormFooter />
                }

            </div>
        </div>
  )
}

export default Form
