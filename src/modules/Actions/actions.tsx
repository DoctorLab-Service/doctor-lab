import { ToggleTheme, ToggleLanguage } from 'components'
import classNames from 'classnames'
import { FC } from 'react'

import './styles/index.sass'

interface Props {
    darkMode: boolean
    toggleTheme: () => void
    className?: string
}

const Actions: FC<Props> = ({ toggleTheme, darkMode, className }) => {
    const languages = [
        { value: 'EN', checked: true, },
        { value: 'RU', checked: false, },
    ]
    const classes = classNames('actions', className)
    return (
        <header className={classes}>
            <ToggleTheme toggleTheme={toggleTheme} darkMode={darkMode} />
            <ToggleLanguage langauges={languages} />
        </header>
    )
}

Actions.defaultProps = {
    darkMode: false,
    className: ''
}

export default Actions