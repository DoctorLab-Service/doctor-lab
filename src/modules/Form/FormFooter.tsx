import { FC } from 'react'
import { Social } from 'components'
import { FormFooterProps } from 'types/props'

const FormFooter: FC<FormFooterProps> = () => {
    return (
        <footer className='form-footer'>
            <Social providers={['facebook', 'google']} />
        </footer>
    )
}

export default FormFooter
