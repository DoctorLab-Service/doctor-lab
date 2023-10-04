import { useForm, usePaths, useValidation } from 'hooks'
import { FC, useEffect, useState, } from 'react'
import { Input } from 'components/ui'
import { FieldsProps } from 'types/props'
import { PhoneSVG, EmailSVG, PasswordSVG, UserSVG } from 'assets/icons'

const RegisterFields: FC<FieldsProps> = ({ placeholders }) => {
    const { state } = usePaths()
    const { isEmpty } = useValidation()    
    const { onChange, onBlur, form, validate } = useForm()
    
    const [validateInput, setValidateInput] = useState({})
    
    useEffect(() => {
        const validation = isEmpty(validate) ? state?.validate ? state.validate : validate : validate
        setValidateInput(validation) // set validation from state
    }, [isEmpty, state, validate])

    return (
        <>
            <Input
                id='fullname'
                type='text'
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
                validate={validateInput}
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.password}
                value={form.password ? form.password : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='rePassword'
                type='password'
                validate={validateInput}
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.rePassword}
                value={form.rePassword ? form.rePassword : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
        </>
    )
}

export default RegisterFields