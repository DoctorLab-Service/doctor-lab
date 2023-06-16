import { FC, useEffect, useState } from 'react'
import { InputGroup } from 'components'
import { useForm, usePaths, useValidation } from 'hooks'
import { FormBodyProps } from 'types/props'
import FormBodyFooter from './FormBodyFooter'
import FormBodyHeader from './FormBodyHeader'


const FormBody: FC<FormBodyProps> = ({ currentRole, pagename }) => {
    const [desabled, setDesabled] = useState<boolean>(true)

    const { isEmpty } = useValidation()
    const { paths, navigate, state } = usePaths()
    const { onSubmit, form, setForm, emptyForm, validate, setValidate } = useForm({})

    const pathWithRole = currentRole.key === 'doctor' || currentRole.key === 'dentist' 
    ? paths.register.doctor[currentRole.key] 
    : currentRole.key !== 'admin' ? paths.register[currentRole.key] : paths.login

    const isAdmin = currentRole.key === 'admin'
    
    const toVerification = (): void => {
        navigate(paths.verification.phone, { state: form })
    }
    const toRegister = (): void => {
        navigate(pathWithRole, { state })
    }
    useEffect(() => {
        if(!isEmpty(validate)) {
            const statusFalse: boolean[] = []
            for(let key in validate) {
                validate[key].status === false && (statusFalse.push(validate[key].status))
            }
            setDesabled((statusFalse.length || emptyForm) ? true : false)
        }

    }, [emptyForm, isEmpty, validate])
    
    return (
        <form className='form-body'>
            <FormBodyHeader
                pagename={pagename}
                currentRole={currentRole}
                formState={state && state.phone}
            />

            <InputGroup
                pagename={pagename}
                setForm={setForm}
                setValidate={setValidate}
             />

            <FormBodyFooter
                paths={paths}
                onClick={onSubmit}
                pagename={pagename}
                pathWithRole={pathWithRole}
                toVerification={toVerification}
                toRegister={toRegister}
                emptyForm={desabled}
                isAdmin={isAdmin}
            />
        </form>
  )
}

FormBody.defaultProps = {
    pagename: 'login'
}

export default FormBody
