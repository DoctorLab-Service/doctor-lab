import { FC } from 'react'
import { FieldsProps } from 'types/props'
import { Input, Textarea } from 'components/ui'
import { EmailSVG, SubjectSVG, UserSVG } from 'assets/icons'
import { useForm } from 'hooks'

const SupportFields: FC<FieldsProps> = ({ placeholders }) => {
    const { onChange, onBlur, form, validate } = useForm()

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