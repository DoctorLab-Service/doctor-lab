import { LoginDarkContentImg, LoginLightContentImg } from 'assets/img'
import { FC } from 'react'

import './styles/index.sass'

interface Props {
    darkMode: boolean
    type: 'login'
    children: JSX.Element | JSX.Element[]
} 

const Background: FC<Props> = ({ children, type, darkMode }) => {

    let imgSrc: string
    switch (type) {
        case 'login':
            imgSrc = darkMode ? LoginDarkContentImg : LoginLightContentImg
            break
        default: 
            imgSrc = darkMode ? LoginDarkContentImg : LoginLightContentImg
            break 
    }

    return (
        <>
            <div className='image-block'>
                <div className='image-wrapper'>
                    <img src={imgSrc} alt={type} />
                </div>
            </div>

            <div className='content-block'>
                <div className='content-background'></div>
                    { children }
            </div>
        </>
    )
}

export default Background