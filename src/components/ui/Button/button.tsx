import { FC, MouseEventHandler } from 'react'
import classNames from 'classnames'

import './styles/index.sass'
import { Link } from 'react-router-dom'

interface ButtonProps {
    link?: string
    id?: string
    text?: string
    className?: string
    size?: 'small' | 'medium' | 'large'
    type?: 'button' | 'submit' | 'reset'
    onClick?: MouseEventHandler<HTMLButtonElement>
    children?: JSX.Element | JSX.Element[]
    variant?: 'primary' | 'secondary' | 'default' | 'disabled' | 'warning'
    fullSize?: boolean
    noReset?: boolean
    circle?: boolean
}

const Button: FC<ButtonProps> = ({ id, text, className, size, fullSize, type, variant, onClick, children, noReset, link, circle }) => {
    const classes = classNames(
        link ? 'link' : 'btn',
        size,
        className,
        fullSize && 'full',
        circle && 'circle',
    )
    const classesText = classNames(
        link ? 'link-text' : 'btn-text',
        size,
        variant,
    )

    const clickHandler = (e) => {
        noReset && e.preventDefault()
        return onClick(e)
    }

    return (
        <>
            {
                link 
                    ? <Link className={classes} to={link}>
                        <span className={classesText}>{children ? children : text}</span>
                    </Link>
                    : <button
                        id={id}
                        type={type}
                        className={classes}
                        onClick={(e) => clickHandler(e)}>
                        <span className={classesText}>{ children ? children : text }</span>
                    </button>
            }
        </>
    )
}

Button.defaultProps = {
    className: '',
    text: 'Submit',
    size: 'medium',
    type: 'button',
    variant: 'default',
    fullSize: false,
    noReset: false,
    circle: false,
    link: undefined,
}

export default Button
