import { useForm, usePaths } from 'hooks'
import { FC, useEffect } from 'react'
import { Input } from 'components/ui'
import { FieldsProps } from 'types/props'
import { PhoneSVG, EmailSVG, PasswordSVG, UserSVG } from 'assets/icons'

const RegisterFields: FC<FieldsProps> = ({ placeholders, setForm, setValidate }) => {
    const { pathname, state, navigate } = usePaths()
    const { onChange, onBlur, form, validate } = useForm({
        fullname: state && state.fullname ? state.fullname : '',
        email: state && state.email ? state.email : '',
        phone: state && state.phone ? state.phone : '',
        password: state && state.password ? state.password : '',
        confirmPassword: state && state.confirmPassword ? state.confirmPassword : '',
    })

    useEffect(() => {
        setForm(form)
        setValidate(validate)

        // Clear State
        window.onload = function () {
            if (document.readyState === "complete") {
                navigate(pathname, { state: null })
            }
        }
    }, [form, navigate, pathname, setForm, setValidate, validate])


    return (
        <>
            <Input
                id='fullname'
                type='text'
                validate={validate}
                image={<UserSVG className='input-icon' />}
                placeholder={placeholders.fullname}
                value={form.fullname ? form.fullname : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='email'
                type='email'
                validate={validate}
                image={<EmailSVG className='input-icon' />}
                placeholder={placeholders.email}
                value={form.email ? form.email : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='phone'
                type='tel'
                validate={validate}
                image={<PhoneSVG className='input-icon' />}
                placeholder={placeholders.phone}
                value={form.phone ? form.phone : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='password'
                type='password'
                validate={validate}
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.password}
                value={form.password ? form.password : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='confirmPassword'
                type='password'
                validate={validate}
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