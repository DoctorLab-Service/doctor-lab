import { Logo, Roles } from 'components'
import { FC } from 'react'
import { FormHeaderProps } from 'types/props'

const FormHeader: FC<FormHeaderProps> = ({ darkMode, roles, changeRole }) => {
    return (
        <header className='form-header'>
            <nav className='form-header-nav'>
                <div className='form-header-logo circle'>
                    <Logo darkMode={ darkMode } />
                </div>
                {
                    roles && <Roles roles={roles} changeRole={changeRole} />
                }
            </nav>
        </header>
    )
}

FormHeader.defaultProps = {
    darkMode: false,
    roles: [],
}

export default FormHeader
