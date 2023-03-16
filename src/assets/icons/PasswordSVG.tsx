import { FC } from 'react'
import { SVGProps } from '../types'

const PasswordSVG: FC<SVGProps> = ({ className }) => {
    return (
        <span className={ className }>
            <svg id='PasswordSVG' className={`${className}-svg`} version='1.1' xmlns='http://www.w3.org/2000/svg'
                x='0px' y='0px' viewBox='0 0 512 512'
            >
                <g>
                    <g>
                        <g>
                            <path d='M469.599,141.887H42.401C19.021,141.887,0,160.908,0,184.288v143.425c0,23.38,19.021,42.401,42.401,42.401h427.198
                                                    c23.38,0,42.401-19.021,42.401-42.401V184.288C512,160.908,492.979,141.887,469.599,141.887z M475.656,327.711
                                                    c0,3.34-2.717,6.057-6.057,6.057H42.401c-3.34,0-6.057-2.717-6.057-6.057V184.288c0-3.34,2.717-6.057,6.057-6.057h427.198
                                                    c3.34,0,6.057,2.717,6.057,6.057V327.711z' />
                            <circle cx='146.525' cy='256.003' r='30.432' />
                            <circle cx='255.846' cy='256.003' r='30.432' />
                            <path d='M405.609,237.828H346.86c-10.036,0-18.172,8.136-18.172,18.172s8.136,18.172,18.172,18.172h58.749
                                                    c10.036,0,18.172-8.136,18.172-18.172S415.645,237.828,405.609,237.828z' />
                        </g>
                    </g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
            </svg>
        </span>
    )
}

PasswordSVG.defaultProps = {
    className: 'icon'
}

export default PasswordSVG


