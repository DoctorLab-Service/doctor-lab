import { useEffect, useMemo, useState } from "react"
import { DoctorAvatarIMG, DentistAvatarIMG, PatientAvatarIMG, AdminAvatarIMG } from "assets/img"
import { localStorageKey } from "core/localstorage"
import { RolesList } from "types"

interface UseRoles {
    roles: RolesList[]
    currentRole: string
    currentRoleId: number
    changeRole: (idx: number) => void
}

export const useRoles = (): UseRoles => {
    const [currentRole, setCurrentRole] = useState<string>('doctor')
    const [currentRoleId, setCurrentRoleId] = useState<number>(0)
    const [changedId, setChangedId] = useState<number>(0)
    const [change, setChange] = useState<boolean>(false)
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

    useMemo(() => {
        const roleIdLocalStorage = Number(localStorage.getItem(localStorageKey.role))
        roleIdLocalStorage === null && localStorage.setItem(localStorageKey.role, String(changedId))


        const roleValue = roles[currentRoleId] !== undefined ? roles[currentRoleId].value.toLowerCase() : currentRole
        setCurrentRole(roleValue)

        const existRole = roles.filter((role, idx) =>
            idx === Number(roleIdLocalStorage) ? (role.changed = true) : (role.changed = false)
        )
        !existRole.length && localStorage.setItem(localStorageKey.role, String(changedId))

        return [...roles, ...existRole]
    }, [changedId, currentRole, currentRoleId, roles]);

    useEffect(() => {
        const roleIdLocalStorage = Number(localStorage.getItem(localStorageKey.role))
        setCurrentRoleId(roleIdLocalStorage)

        if (change) {
            roles.filter(role => role.changed && (
                role.changed = false,
                roles[changedId].changed = true
            ))

            localStorage.setItem(localStorageKey.role, String(changedId))
            setChange(false)
        }
        
    }, [change, changedId, roles])



    const changeRole = (idx: number): void => {
        setChangedId(idx)
        setChange(true)
    }

    return {
        roles,
        currentRole,
        currentRoleId,
        changeRole,
    }
}
