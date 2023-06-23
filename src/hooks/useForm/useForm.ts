import { useEffect, useState } from 'react'

import { useValidation } from 'hooks'
import { Form, UseForm } from 'types'
import { Mutations } from './Mutations'


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
        e.target.blur && validationInput(e, form)
    }

    const onChange = (e) => {
        validationInput(e, form)
        setForm(form => ({
            ...form,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e, request: any): void => {
        e.preventDefault()
        console.log(form)
        if (request && !emptyForm(form)) {
            request()
            console.log("REQUEST IS COMPLITED")
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
 
    const clearValidate = () => setValidate({})

    return {
        form,
        onBlur,
        onFocus,
        setForm,
        onSubmit,
        onChange,
        validate,
        setValidate,
        clearValidate,
        emptyForm: emptyForm(form),
        mutations: Mutations(form),
    }
}