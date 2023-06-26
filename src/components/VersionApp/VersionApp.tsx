import { FC } from "react"

const VersionApp: FC<{ version: string }> = ({version}) => {

    return (
        <span style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            color: 'rgba(0,0,0, .5)',
            zIndex: '2',
            fontSize: '12px'
        }}>{version}</span>
    ) 
}

export default VersionApp