import { useEffect, useMemo, useState } from "react"
import { DoctorAvatarIMG, DentistAvatarIMG, PatientAvatarIMG, AdminAvatarIMG } from "assets/img"
import { localStorageKey } from "core/localstorage"
import { RolesList, UseRoles } from "types"
import { useTranslate } from "utils/languages"
import { Roles } from "types/core"

const rolesMock = [
    {
        key: 'doctor',
        value: 'Doctor',
        src: DoctorAvatarIMG,
        changed: false,
    },
    {
        key: 'dentist',
        value: 'Dentist',
        src: DentistAvatarIMG,
        changed: false,
    },
    {
        key: 'patient',
        value: 'Patient',
        src: PatientAvatarIMG,
        changed: false,
    },
    {
        key: 'admin',
        value: 'Admin',
        src: AdminAvatarIMG,
        changed: false,
    },
]
export const useRoles = (): UseRoles => {
    
    const { translation: {
        login: { roles: rolesValue }
    } } = useTranslate('auth', [['login', true]])
    
    const [change, setChange] = useState<boolean>(false)
    const [changedId, setChangedId] = useState<number>(0)
    const [currentRoleId, setCurrentRoleId] = useState<number>(0)
    const [currentRoleKey, setCurrentRoleKey] = useState<Roles>('doctor')
    const [currentRoleValue, setCurrentRoleValue] = useState<string>(rolesValue.doctor)
    const [roles, setRoles] = useState<RolesList[]>(rolesMock)

    useMemo(() => {
        // Get Role id from localstorage
        const roleIdLocalStorage = Number(localStorage.getItem(localStorageKey.role))
        roleIdLocalStorage === null && localStorage.setItem(localStorageKey.role, String(changedId))

        // Get Role key and value and  sett it on  state
        const roleKey = roles[currentRoleId] !== undefined ? roles[currentRoleId].key.toLowerCase() : currentRoleKey
        const roleValue = roles[currentRoleId] !== undefined ? roles[currentRoleId].value : currentRoleValue
        setCurrentRoleKey(roleKey)
        setCurrentRoleValue(roleValue)
        
        // Check to exists role 
        const existRole = roles.filter((role, idx) =>
            idx === Number(roleIdLocalStorage) ? (role.changed = true) : (role.changed = false)
        )
        !existRole.length && localStorage.setItem(localStorageKey.role, String(changedId))

        return [...roles, ...existRole]
    }, [changedId, roles, currentRoleId, currentRoleKey, currentRoleValue]);

    useEffect(() => {
        // Change role if changed language
        if (currentRoleValue !== rolesValue[currentRoleKey]) {
            const uRoles = rolesMock.map(role => ({
                key: role.key,
                value: rolesValue[role.key],
                src: role.src,
                changed: role.changed,
            }))
            setRoles(uRoles)
        }

        // Get Role from localstorage
        const roleIdLocalStorage = Number(localStorage.getItem(localStorageKey.role))
        setCurrentRoleId(roleIdLocalStorage)

        // Change role
        if (change) {
            roles.filter(role => role.changed && (
                role.changed = false,
                roles[changedId].changed = true
            ))

            localStorage.setItem(localStorageKey.role, String(changedId))
            setChange(false)
        }

    }, [change, changedId, currentRoleKey, currentRoleValue, roles, rolesValue])



    /**
     * Change current role
     * @param idx: number
     */
    const changeRole = (idx: number): void => {
        setChangedId(idx)
        setChange(true)
    }

    return {
        roles,
        currentRole: {
            key: currentRoleKey,
            value: currentRoleValue,
        },
        currentRoleId,
        changeRole,
    }
}
