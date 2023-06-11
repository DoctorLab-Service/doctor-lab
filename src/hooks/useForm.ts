import { useEffect, useState } from 'react'

import { useValidation } from 'hooks'
import { Form, UseForm } from 'types'


export const useForm = (initialState: Record<string, any> = {}): UseForm => {
    const [form, setForm] = useState<Record<string, any>>(initialState)

    const { validationInput, validate, isEmpty, setValidate, setForm: setInitialForm } = useValidation()

    useEffect(() => {
        setInitialForm(form)
    }, [form, setInitialForm])

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

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(form)
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
        emptyForm: emptyForm(form)
    }
}