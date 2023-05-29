import { useState } from 'react'

import { useValidation } from 'hooks'
import { UseFormResponse } from 'types'



export const useForm = (initialState: Record<string, any> = {}): UseFormResponse => {
    const [form, setForm] = useState<Record<string, any>>(initialState)

    const { validationInput, validate, emptyForm } = useValidation()

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


    return {
        onChange,
        onSubmit,
        onFocus,
        onBlur,
        validate,
        form,
        emptyForm: emptyForm(form)
    }
}