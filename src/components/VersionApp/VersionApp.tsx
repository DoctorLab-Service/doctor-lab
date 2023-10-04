import { FC } from "react"

import './index.sass'

const VersionApp: FC<{ version: string }> = ({version}) => {

    return (
        <span className='version'>{version}</span>
    ) 
}

export default VersionApp