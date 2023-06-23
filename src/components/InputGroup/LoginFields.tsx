import { FC, useEffect} from 'react'
import { Input } from 'components/ui'
import { useForm, useValidation } from 'hooks'
import { FieldsProps } from 'types/props'
import { PhoneSVG, EmailSVG, PasswordSVG } from 'assets/icons'

const LoginFields: FC<FieldsProps> = ({ placeholders, setForm, setValidate }) => {
    const { isPhone } = useValidation()
    const { onChange, form, validate } = useForm({
        login: '',
        password: '',
    })

    useEffect(() => {
        setForm(form)
        setValidate(validate)
    }, [form, setForm, setValidate, validate])

    return (
        <>
            <Input
                id='login'
                type='text'
                image={isPhone(form.login) ? <PhoneSVG className='input-icon' /> : <EmailSVG className='input-icon' />}
                placeholder={placeholders.login}
                value={form.login ? form.login : ''}
                validate={validate}
                onChange={onChange}
                />
            <Input
                id='password'
                type='password'
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.password}
                value={form.password ? form.password : ''}
                validate={validate}
                onChange={onChange}
                />
        </>
    )
}

export default LoginFields