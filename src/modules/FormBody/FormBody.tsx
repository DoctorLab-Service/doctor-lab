import { FC, useEffect, useState } from 'react'
import { InputGroup } from 'components'
import { useForm, usePaths, useRoles, useValidation } from 'hooks'
import { FormBodyProps } from 'types/props'
import FormBodyFooter from './FormBodyFooter'
import FormBodyHeader from './FormBodyHeader'


const FormBody: FC<FormBodyProps> = () => {
    // Custom hooks
    const { isEmpty } = useValidation()
    const { paths, navigate, state } = usePaths()
    const { onSubmit, form, setForm, emptyForm, validate, setValidate, mutations } = useForm({})
    const [desabled, setDesabled] = useState<boolean>(true)

    const { currentRole, pathWithRole } = useRoles()
 
    const isAdmin = currentRole.key === 'admin'
    

    // Set form state when register  and redirect to other path
    const toVerification = (): void => {
        navigate(paths.verification.phone, { 
            state: { fields: {
                ...form,
                ...state,
            },
            validate: !isEmpty(validate) ? validate : {} 
        }})

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
                formState={state?.fields?.phone}
            />

            <InputGroup
                setForm={setForm}
                setValidate={setValidate}
                />

            <FormBodyFooter
                paths={paths}
                onClick={onSubmit}
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
