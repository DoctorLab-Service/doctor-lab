import { usePaths, useValidation } from 'hooks'
import { Form, UseForm } from 'types'
import { FormType } from 'types/core'
import { Mutations } from './Mutations'
import { toast } from 'react-toastify'
import { RootState, setForm, useAppDispatch, useAppSelector } from 'store'


export const useForm = (): UseForm => {
    // Get form name from page name
    const { page: { pagename, isRecoveryPassword } } = usePaths()
    const formName: FormType =  pagename

    // Redux Store
    const dispatch = useAppDispatch()
    const form = useAppSelector((({ form: { forms }}: RootState) => forms[formName]))
    
    // Validation
    const { validationInput, validate, isEmpty } = useValidation(formName)
   
    
    // Default form actions
    const onFocus = (e) => {
        console.log(e.target.focus)
    }

    const onBlur = (e) => {
        e.target.blur && validationInput(e)
    }

    // Get input data
    const onChange = (e) => {
        validationInput(e)

        // Set for into redux state from
        dispatch(setForm({
            formName,
            form: {
                name: e.target.name,
                value: e.target.value
            }
        }))
    }
    
    // Submit form
    const onSubmit = (e, request: any): void => {
        e.preventDefault()
        
        // Validate to empty form
        if (!isEmpty(form)) {
            for (let error in validate) {
                if (validate[error].message.length) {
                    toast.error(validate[error].message)
                }
            }
            
        }

        // If is request and not empty form send request
        if (request ) {
            if (!emptyForm(form)) {
                request();

                // Reset form after sending
                formName !== 'register' && dispatch(setForm({ formName }))
                return 
            }

            // If recovery password page then send request
            isRecoveryPassword && request();
            return 
        }
    }

    const resetForm = () => dispatch(setForm({ formName }))

    // Check Empry From 
    const emptyForm = (form: Form = {}): boolean => {
        if (!isEmpty(form)) {
            const formLength = Object.keys(form)
            const fieldsLength = []
            
            for(let key in form) {
                if(form[key].length) fieldsLength.push(form[key])
            }
            return formLength.length !== fieldsLength.length
        }
        return true
    }  
 

    return {
        form,
        onBlur,
        onFocus,
        setForm,
        onSubmit,
        onChange,
        validate,
        resetForm,
        emptyForm: isRecoveryPassword ? false : emptyForm(form),
        mutations: Mutations( isRecoveryPassword ? {} : form, validate),
    }
}