import { FC } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ButtonProps } from 'types/props'
import { useDarkMode } from 'hooks'

const Button: FC<ButtonProps> = ({ id, text, className, size, fullSize, type, variant, onClick, children, noReset, link, circle, button, noSize, disabled, ...args }) => {
    const { resetTransition } = useDarkMode()


    type =  type === undefined && !link ? 'button' : type
    const classes = classNames(
        (link && type !== 'button') || type === 'link' ? 'link' : 'btn',
        !noSize && size,
        className,
        fullSize && 'full',
        circle && 'circle',
        disabled && 'disabled',
    )
    const classesText = classNames(
        link ? 'link-text' : 'btn-text',
        // size,
        variant,
    )

    const clickHandler = (e) => {
        noReset && e.preventDefault()
        return onClick && onClick(e)
    }
    const clickLink = (e) => {
        resetTransition(true)
        setTimeout(() => {
            resetTransition()
        }, 100)
        clickHandler(e)
    }

    return (
        <>
            {
                link
                    ? <Link 
                        className={classes}
                        to={disabled ? null : link}
                        onClick={(e) => clickLink(e)}
                        {...args}
                    >
                        <span className={classesText}>{children ? children : text}</span>
                    </Link>
                    : <button
                        id={id}
                        type={type === 'link' ? 'button' : type}
                        className={classes}
                        onClick={(e) => clickHandler(e)}
                        {...args}
                        >
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
    type: undefined,
    variant: 'none',
    fullSize: false,
    noReset: false,
    circle: false,
    noSize: false,
    link: undefined,
}

export default Button
