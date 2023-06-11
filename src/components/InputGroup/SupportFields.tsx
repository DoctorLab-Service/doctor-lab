import { FC, useEffect } from 'react'
import { FieldsProps } from 'types/props'
import { Input, Textarea } from 'components/ui'
import { EmailSVG, SubjectSVG } from 'assets/icons'
import { useForm } from 'hooks'

const SupportFields: FC<FieldsProps> = ({ placeholders, setForm }) => {
    const { onChange, onBlur, form, validate } = useForm({
        email: '',
        subject: '',
        message: '',
    })

    useEffect(() => {
        setForm(form)
    }, [form, setForm])

    return (
        <>
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
                id='subject'
                type='text'
                validate={validate}
                image={<SubjectSVG className='input-icon' />}
                placeholder={placeholders.subject}
                value={form.subject ? form.subject : ''}
                onBlur={onBlur}
                onChange={onChange}
                />
            <Textarea
                id='message'
                validate={validate}
                placeholder={placeholders.supportMessage}
                value={form.message ? form.message : ''}
                onBlur={onBlur}
                onChange={onChange}
            />
        </>
    )
}

export default SupportFields