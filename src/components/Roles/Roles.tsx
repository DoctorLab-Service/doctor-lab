import { FC } from 'react'
import RoleItem from './RoleItem'
import { RolesProps } from 'types/props'


const Roles: FC<RolesProps> = ({ roles, changeRole }) => {
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

Roles.defaultProps = {
    roles: [],
}

export default Roles