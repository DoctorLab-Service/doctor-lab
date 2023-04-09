import { FC } from 'react'
import RoleItem from './RoleItem'

import './index.sass'
import { RolesList } from 'types'

interface Props {
    roles: RolesList[]
    changeRole: (idx: number) => void

}

const Roles: FC<Props> = ({ roles, changeRole }) => {
    return (
        <div className='form-header-roles'>
            {
                roles.map(({ value, src, changed }, idx) => {
                    return <RoleItem 
                        key={idx}
                        value={value}
                        src={src}
                        changed={changed}
                        onClick={() => changeRole(idx)}
                        // onClick={() => changedHandler(idx)}
                    />
                })
            }
        </div>
    )
}

Roles.defaultProps = {}

export default Roles