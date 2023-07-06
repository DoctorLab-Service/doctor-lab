import { useEffect, useState } from 'react'

import { useValidation } from 'hooks'
import { Form, UseForm } from 'types'
import { Mutations } from './Mutations'
import { toast } from 'react-toastify'


export const useForm = (initialState: Record<string, any> = {}): UseForm => {

    const [form, setForm] = useState<Record<string, any>>(initialState)
    
    
    // Validation
    const { validationInput, validate, isEmpty, setValidate, setForm: setInitialForm } = useValidation()
   
    useEffect(() => {
        setInitialForm(form)
    }, [form, setInitialForm])
    
    // Default form actions
    const onFocus = (e) => {
        console.log(e.target.focus)
    }

    const onBlur = (e) => {
        e.target.blur && validationInput(e)
    }

    const onChange = (e) => {
        validationInput(e)
        setForm(form => ({
            ...form,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e, request: any): void => {
        e.preventDefault()
        setForm({...form})
        if (!isEmpty(form)) {
            for (let error in validate) {
                if (validate[error].message.length) {
                    toast.error(validate[error].message)
                }
            }

        }
        if (request && !emptyForm(form)) {
            request()
        }
    }

    const emptyForm = (form: Form): boolean => {
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
        setValidate,
        emptyForm: emptyForm(form),
        mutations: Mutations(form, validate),
    }
}