import { DoctorAvatarIMG, DentistAvatarIMG, PatientAvatarIMG, AdminAvatarIMG } from 'assets/img'
import { FC, useEffect, useMemo, useState } from 'react'
import RoleItem from './RoleItem'

import './styles/index.sass'

interface Props {}

interface RolesList {
    value: string
    src: string
    changed: boolean
}

const Roles: FC<Props> = ({}) => {
    const [roles, setRoles] = useState<RolesList[]>([
        {
            value: 'Doctor',
            src: DoctorAvatarIMG,
            changed: false,
        },
        {
            value: 'Dentist',
            src: DentistAvatarIMG,
            changed: false,
        },
        {
            value: 'Patient',
            src: PatientAvatarIMG,
            changed: false,
        },
        {
            value: 'Admin',
            src: AdminAvatarIMG,
            changed: false,
        },
    ])
    const [changedId, setChangedId] = useState<number>(0)
    const [change, setChange] = useState<boolean>(false)


    useMemo(() => {
        const currentRole = localStorage.getItem('lg-auth-role')
        currentRole === null && localStorage.setItem('lg-auth-role', String(changedId))


        const existRole = roles.filter((role, idx) =>
            idx === Number(currentRole) ? (role.changed = true) : (role.changed = false)
        )
        !existRole.length && localStorage.setItem('lg-auth-role', String(changedId))

        return [...roles, ...existRole]
    }, [changedId, roles]);


    useEffect(() => {
        if (change) {
            roles.filter(role => role.changed && (
                role.changed = false,
                roles[changedId].changed = true
            ))

            localStorage.setItem('lg-auth-role', String(changedId))
            setChange(false)
        }

    }, [roles, changedId, change])

    const changedHandler = (idx) => {
        setChangedId(idx)
        setChange(true)
    }

    return (
        <div className='form-header-roles'>
            {
                roles.map(({ value, src, changed }, idx) => {
                    return <RoleItem 
                        key={idx}
                        value={value}
                        src={src}
                        changed={changed}
                        onClick={() => changedHandler(idx)}
                    />
                })
            }
        </div>
    )
}

Roles.defaultProps = {}

export default Roles