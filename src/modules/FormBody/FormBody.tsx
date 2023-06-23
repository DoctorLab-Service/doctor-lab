import { FC, useEffect, useState } from 'react'
import { InputGroup } from 'components'
import { useForm, usePaths, useValidation } from 'hooks'
import { FormBodyProps } from 'types/props'
import FormBodyFooter from './FormBodyFooter'
import FormBodyHeader from './FormBodyHeader'


const FormBody: FC<FormBodyProps> = ({ currentRole, pagename }) => {
    // Custom hooks
    const { isEmpty } = useValidation()
    const { paths, navigate, state } = usePaths()
    const { onSubmit, form, setForm, emptyForm, validate, setValidate, mutations } = useForm({})
    const [desabled, setDesabled] = useState<boolean>(true)

    // Set path with role
    const pathWithRole = currentRole.key === 'doctor' || currentRole.key === 'dentist' 
    ? paths.register.doctor[currentRole.key] 
    : currentRole.key !== 'admin' ? paths.register[currentRole.key] : paths.login

    const isAdmin = currentRole.key === 'admin'
    

    // Set form state when register  and redirect to other path
    const toVerification = (): void => {
        navigate(paths.verification.phone, { state: { ...form, validate: !isEmpty(validate) ? validate : {} } })

    }
    const toRegister = (): void => {
        navigate(pathWithRole, { state })
    }


    useEffect(() => {
        // Set disabled button if validate
        if(!isEmpty(validate)) {
            const statusFalse: boolean[] = []
            for(let key in validate) {
                validate[key].status === false && (statusFalse.push(validate[key].status))
            }
            setDesabled((statusFalse.length || emptyForm) ? true : false)
        } 
        setDesabled(emptyForm ? true : false)
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
                mutations={mutations}
            />
        </form>
  )
}

FormBody.defaultProps = {
    pagename: 'login'
}

export default FormBody
