import { DarkSVG, LightSVG } from 'assets/icons'
import { FC } from 'react'

import './styles/index.sass'

interface Props {
    darkMode?: boolean
    toggleTheme: () => void
}


const ToggleTheme: FC<Props> = ({ darkMode, toggleTheme }) => {

    return (
        <button className='theme-toggle circle' onClick={() => toggleTheme()}>
            {
                darkMode
                    ? <DarkSVG className='theme-toggle-icon' />
                    : <LightSVG className='theme-toggle-icon' />

            }
        </button>
    )
}

ToggleTheme.defaultProps = {
    darkMode: false
}

export default ToggleTheme
