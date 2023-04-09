import { Logo, Roles } from 'components'
import { FC } from 'react'

import './index.sass'
import { RolesList } from 'types'

interface Props {
    darkMode: boolean
    roles: RolesList[]
    changeRole: (idx: number) => void

}

const FormHeader: FC<Props> = ({ darkMode, roles, changeRole }) => {
    return (
        <header className='form-header'>
            <nav className='form-header-nav'>
                <div className='form-header-logo circle'>
                    <Logo darkMode={ darkMode } />
                </div>
                <Roles roles={roles} changeRole={changeRole} />
            </nav>
        </header>
    )
}

FormHeader.defaultProps = {
    darkMode: false,
}

export default FormHeader
