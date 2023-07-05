import { useForm, usePaths, useValidation } from 'hooks'
import { FC, useEffect, useState } from 'react'
import { Input } from 'components/ui'
import { FieldsProps } from 'types/props'
import { PhoneSVG, EmailSVG, PasswordSVG, UserSVG } from 'assets/icons'

const RegisterFields: FC<FieldsProps> = ({ placeholders, setForm, setValidate }) => {
    const { isEmpty } = useValidation()
    const { pathname, state, navigate } = usePaths()
    const { onChange, onBlur, form, validate, setForm: setLocalForm } = useForm({
        fullname: state?.fields?.fullname ? state.fields.fullname : '',
        email: state?.fields?.email ? state.fields.email : '',
        phone: state?.fields?.phone ? state.fields.phone : '',
        password: state?.fields?.password ? state.fields.password : '',
        confirmPassword: state?.fields?.confirmPassword ? state.fields.confirmPassword : '', 
    })
    const [validateInput, setValidateInput] = useState({})

    useEffect(() => {
        // Clear State
        window.onload = function () {
            if (document.readyState === "complete") {
            setLocalForm({
                fullname: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword:  '',
            })
                navigate(pathname, { state: null })
            }
        }
        setForm(form)
        const validation = isEmpty(validate) ? state?.validate ? state.validate : validate : validate
        
        setValidateInput(validation) // set validation from state
        setValidate(validation) 


    }, [form, isEmpty, navigate, pathname, setForm, setLocalForm, setValidate, state, validate])


    return (
        <>
            <Input
                id='fullname'
                type='text'
                // validate={validate}
                validate={validateInput}
                image={<UserSVG className='input-icon' />}
                placeholder={placeholders.fullname}
                value={form.fullname ? form.fullname : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='email'
                type='email'
                // validate={validate}
                validate={validateInput}
                image={<EmailSVG className='input-icon' />}
                placeholder={placeholders.email}
                value={form.email ? form.email : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='phone'
                type='tel'
                // validate={validate}
                validate={validateInput}
                image={<PhoneSVG className='input-icon' />}
                placeholder={placeholders.phone}
                value={form.phone ? form.phone : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='password'
                type='password'
                // validate={validate}
                validate={validateInput}
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.password}
                value={form.password ? form.password : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='confirmPassword'
                type='password'
                // validate={validate}
                validate={validateInput}
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.confirmPassword}
                value={form.confirmPassword ? form.confirmPassword : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
        </>
    )
}

export default RegisterFields