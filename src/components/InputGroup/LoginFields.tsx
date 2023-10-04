import { FC} from 'react'
import { Input } from 'components/ui'
import { useForm, useValidation } from 'hooks'
import { FieldsProps } from 'types/props'
import { PhoneSVG, EmailSVG, PasswordSVG } from 'assets/icons'


const LoginFields: FC<FieldsProps> = ({ placeholders }) => {
    const { isPhone } = useValidation()
    const { onChange, onBlur, form, validate } = useForm()

    return (
        <>
            <Input
                id='login'
                type='text'
                image={isPhone(form.login) ? <PhoneSVG className='input-icon' /> : <EmailSVG className='input-icon' />}
                placeholder={placeholders.login}
                value={form.login ? form.login : ''}
                validate={validate}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Input
                id='password'
                type='password'
                image={<PasswordSVG className='input-icon' />}
                placeholder={placeholders.password}
                value={form.password ? form.password : ''}
                validate={validate}
                onBlur={onBlur}
                onChange={onChange}
                />
        </>
    )
}

export default LoginFields