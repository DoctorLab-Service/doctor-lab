import { InputGroup } from 'components'
import { FormBodyProps } from 'types/props'
import { FC, useEffect, useState } from 'react'
import { useAppSelector, RootState, useAppDispatch } from 'store'
import { useForm, usePaths, useRoles, useValidation } from 'hooks'
import FormBodyHeader from './FormBodyHeader'
import FormBodyFooter from './FormBodyFooter'


const FormBody: FC<FormBodyProps> = () => {
    const [desabled, setDesabled] = useState<boolean>(true)
    
    // Custom hooks
    const { isEmpty } = useValidation()
    const { currentRole } = useRoles()
    const { paths, page: { isRecoveryPassword, isChangePassword } } = usePaths()
    const { onSubmit, emptyForm, validate, mutations: { mutations } } = useForm()

    // Redux Store
    const dispatch = useAppDispatch()
    const { forms: { register: registerState }, isChangePasswordForm, confirmEmail } = useAppSelector((({ form }: RootState) => form))
 
    const isAdmin = currentRole.key === 'admin'

    useEffect(() => {
        const statusFalse: boolean[] = []

        // Set disabled button if validate
        if(!isEmpty(validate)) {
            for(let key in validate) {
                validate[key].status === false && (statusFalse.push(validate[key].status))
            }
        } 

        // Set Diseble Button 
        setDesabled((statusFalse.length || emptyForm) && !isRecoveryPassword ? true : false)

    }, [dispatch, emptyForm, isChangePasswordForm, isEmpty, isRecoveryPassword, validate])

    const FormTSX = (<form className='form-body'>
        <FormBodyHeader formState={registerState.phone} />

        <InputGroup />

        <FormBodyFooter
            paths={paths}
            onClick={onSubmit}
            emptyForm={desabled}
            isAdmin={isAdmin}
            mutations={mutations}
        />
    </form>)
    
    return (
        <>
            {
                !isChangePassword && !isRecoveryPassword
                    ? FormTSX
                    : isRecoveryPassword && confirmEmail.confirm
                        ? FormTSX 
                        : isChangePassword && isChangePasswordForm 
                            ? FormTSX
                            : FormTSX
            }
        </>
  )
}

export default FormBody
