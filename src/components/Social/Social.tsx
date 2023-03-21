import { SocialLoginButton } from 'components'
import { FC } from 'react'
import { SocialProviders } from 'types'

interface Props {
    providers: SocialProviders[]
}

const Social: FC<Props> = ({ providers }) => {
    return (
        <ul className='social'>
            {
                providers && providers.map(provider => (
                    <li className='item circle'>
                        <SocialLoginButton circle provider={provider} />
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
