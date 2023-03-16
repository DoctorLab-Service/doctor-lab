import { FC } from 'react'
import { SVGProps } from '../types'

const FacebookSVG: FC<SVGProps> = ({ className }) => {
    return (
        <span className={ className }>
            <svg id='FacebookSVG' className={`${className}-svg`} height='512px'
                version='1.1' viewBox='0 0 512 512' width='512px'
                xmlns='http://www.w3.org/2000/svg' >
                <g id='_x38_0-facebook'>
                    <g>
                        <g>
                            <path
                                d='M375.301,181.236h-89.475v-59.813c0-16.51,13.359-29.908,29.828-29.908h29.824V16.75h-59.652     c-49.42,0-89.475,40.162-89.475,89.718v74.768h-59.654V256h59.654v239.25h89.475V256h59.652L375.301,181.236z M375.301,181.236'
                                style={{ fill: '#1B80E4' }} />
                        </g>
                    </g>
                </g>
                <g id='Layer_1' />
            </svg>
        </span>
    )
}

FacebookSVG.defaultProps = {
    className: 'icon'
}

export default FacebookSVG


