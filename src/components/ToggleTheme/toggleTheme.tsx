import { DarkSVG, LightSVG } from 'assets/icons'
import { FC } from 'react'
import { ToggleThemeProps } from 'types/props'

const ToggleTheme: FC<ToggleThemeProps> = ({ darkMode, toggleTheme }) => {

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
