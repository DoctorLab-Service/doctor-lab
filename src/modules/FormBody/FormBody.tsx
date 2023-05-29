import { FC } from 'react'
import { InputGroup } from 'components'
import { paths } from 'core'
import { FormBodyProps } from 'types/props'
import FormBodyFooter from './FormBodyFooter'
import FormBodyHeader from './FormBodyHeader'


const FormBody: FC<FormBodyProps> = ({ currentRole, pagename }) => {
    const pathWithRole = currentRole === 'doctor' || currentRole === 'dentist' 
        ? paths.register.doctor[currentRole] 
        : currentRole !== 'admin' ? paths.register[currentRole] : paths.login
    
    

    return (
        <form className='form-body'>
            <FormBodyHeader pagename={pagename} currentRole={currentRole} />

            <InputGroup pagename={pagename} />

            <FormBodyFooter pathWithRole={pathWithRole} pagename={pagename} onClick={() => console.log('Click Button')} />
        </form>
  )
}

FormBody.defaultProps = {
    pagename: 'login'
}

export default FormBody
