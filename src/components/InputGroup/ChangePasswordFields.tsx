import { FC, useEffect } from 'react'
import { Input } from 'components/ui'
import { FieldsProps } from 'types/props'
import { PasswordSVG } from 'assets/icons'
import { useForm } from 'hooks'

const ChangePasswordFields: FC<FieldsProps> = ({ placeholders, setForm, setValidate }) => {
    const { onChange, onBlur, form, validate } = useForm({
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        setForm(form)
        setValidate(validate)
    }, [form, setForm, setValidate, validate])
    
    return (
        <>
            <Input
                id='password'
                type='password'
                validate={validate}
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.newPassword}
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

export default ChangePasswordFields