import { LoginDarkContentImg, LoginLightContentImg } from 'assets/img'
import { FC } from 'react'
import { BackgroundProps } from 'types/props'

const Background: FC<BackgroundProps> = ({ type, darkMode }) => {

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
        <div className='image-block'>
            <div className='image-wrapper'>
                <img src={imgSrc} alt={type} />
            </div>
        </div>
    )
}

export default Background