import { FC, useEffect, useState } from 'react'
import { InputGroup } from 'components'
import { useForm, usePaths, useRoles, useValidation } from 'hooks'
import { FormBodyProps } from 'types/props'
import FormBodyFooter from './FormBodyFooter'
import FormBodyHeader from './FormBodyHeader'


const FormBody: FC<FormBodyProps> = () => {
    // Custom hooks
    const { isEmpty } = useValidation()
    const { paths, navigate, state, pathname } = usePaths()
    const { onSubmit, form, setForm, emptyForm, validate, setValidate, mutations } = useForm({})
    const [desabled, setDesabled] = useState<boolean>(true)

    const { currentRole, pathWithRole } = useRoles()
 
    const isAdmin = currentRole.key === 'admin'
    

    // Set form state when register  and redirect to other path
    const toRegister = (): void => {
        navigate(pathWithRole, { state })
    }


    useEffect(() => {
        const statusFalse: boolean[] = []

        // Set disabled button if validate
        if(!isEmpty(validate)) {
            for(let key in validate) {
                validate[key].status === false && (statusFalse.push(validate[key].status))
            }
        } 
        setDesabled((statusFalse.length || emptyForm) ? true : false)
        // console.log('validate', validate)

    }, [emptyForm, isEmpty, navigate, pathname, setValidate, state, validate])

    
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
