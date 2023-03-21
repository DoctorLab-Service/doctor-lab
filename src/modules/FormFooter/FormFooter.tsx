import { Social } from 'components'
import { FC } from 'react'

import './index.sass'

interface Props {}

const FormFooter: FC<Props> = ({}) => {
    return (
        <footer className='form-footer'>
            <Social providers={['facebook', 'google']} />
        </footer>
    )
}

export default FormFooter
