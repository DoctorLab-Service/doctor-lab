import { FC } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { ButtonProps } from 'types/props'
import { useDarkMode } from 'hooks'

const Button: FC<ButtonProps> = ({ id, text, className, size, fullSize, type, variant, onClick, children, noReset, link, circle, button, noSize, ...args }) => {
    const { resetTransition } = useDarkMode()


    type =  type === undefined && !link ? 'button' : type
    const classes = classNames(
        link && type !== 'button' ? 'link' : 'btn',
        !noSize && size,
        className,
        fullSize && 'full',
        circle && 'circle',
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

    return (
        <>
            {
                link 
                    ? <Link className={classes} to={link} onClick={() => {
                        resetTransition(true)
                        setTimeout(() => {
                            resetTransition()
                        }, 100)
                    }}>
                        <span className={classesText}>{children ? children : text}</span>
                    </Link>
                    : <button
                        id={id}
                        type={type}
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
