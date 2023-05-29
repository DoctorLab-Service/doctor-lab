import { SocialButton } from 'components'
import { FC } from 'react'
import { SocialProps } from 'types/props'

const Social: FC<SocialProps> = ({ providers }) => {
    return (
        <ul className='social'>
            {
                providers && providers.map((provider, idx) => (
                    <li key={idx} className='item circle'>
                        <SocialButton circle provider={provider} icon />
                    </li>

                ))   
            }
        </ul>
  )
}

Social.defaultProps = {
    providers: []
}

export default Social
