import { Logo, Roles } from 'components'
import { FC } from 'react'

interface Props {
    darkMode: boolean
}

const FormHeader: FC<Props> = ({ darkMode }) => {
    return (
        <header className='form-header'>
            <nav className='form-header-nav'>
                <div className='form-header-logo circle'>
                    <Logo darkMode={ darkMode } />
                </div>
                <Roles />
            </nav>
        </header>
    )
}

FormHeader.defaultProps = {
    darkMode: false,
}

export default FormHeader
