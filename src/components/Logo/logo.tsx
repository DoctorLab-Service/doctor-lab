import { MiniLightLogoIMG, MiniDarkLogoIMG } from 'assets/img'
import classNames from 'classnames'
import { FC } from 'react'

import './index.sass'

interface Props {
    darkMode: boolean;
    circle?: boolean;
    className?: string;
}

const Logo: FC<Props> = ({ darkMode, circle , className}) => {
    const classes = classNames(
        'logo',
        className,
        circle && 'circle'
    )
    return (
        <div className={classes}>
            <img className='logo-img' src={!darkMode ? MiniLightLogoIMG : MiniDarkLogoIMG} alt='Doctor Lab Service Logo' />
        </div>
    )
}

Logo.defaultProps = {
    darkMode: false,
    className: '',
    circle: true,
}

export default Logo
