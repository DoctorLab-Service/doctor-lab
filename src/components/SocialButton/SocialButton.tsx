import { useMutation } from '@apollo/client'
import { FacebookSVG, GoogleSVG } from 'assets/icons'
import { Button } from 'components/ui'
import { getGraphQLErrors } from 'core/graphql'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { LoginSocialFacebook, LoginSocialGoogle, IResolveParams } from 'reactjs-social-login'
import { CheckSocialOutput, CheckSocialInput } from 'types/api'
import { SocialButtonProps } from 'types/props'
import { MUTATION_CHECK_SOCIAL } from './graphql'
import { SocialResponseData } from 'types'
import { useAuth, usePaths, useRoles } from 'hooks'


const SocialButton: FC<SocialButtonProps> = ({ redirect_uri, circle,  children, onLogoutSuccess, onLoginStart, scope, provider, icon, text }) => {
    const [social, setSocial] = useState<SocialResponseData>({
        email: '',
        fullname: '',
    })
    // Default Scopes
    const facebookScope = 'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
    const googleScope = 'openid profile email'
    
    const facebookBool = provider === 'facebook'
    const googleBool = provider === 'google'
    
    // Set Component
    const Component = facebookBool ? LoginSocialFacebook : googleBool && LoginSocialGoogle
    const Icon = facebookBool ? FacebookSVG : googleBool && GoogleSVG
    
    // Auth
    const { authentication } = useAuth()
    const { navigate, setState } = usePaths()
    const { pathWithRole } = useRoles()


    // Mutation
    const [ _checkSocial ] = useMutation<CheckSocialOutput, CheckSocialInput>(MUTATION_CHECK_SOCIAL, {
        onCompleted(data) {
            const { ok, accessToken } = data['checkSocial']
            if (ok) {
                authentication(accessToken || '')
                console.log('Hello username, you login successfully')
                return
            }

            setState({ fields: {...social } })
            navigate(pathWithRole)

        },
        onError(err) {
            const errors = getGraphQLErrors(err)
            if (err.graphQLErrors[0]) {
                console.log('err.graphQLErrors[0]', errors)
                toast.error(errors)
            } else {
                console.log('errors', errors)
            }
        },
    })

    // Methods
    const onResolve = ({ provider, data }: IResolveParams) => {
        const socialId = provider === 'facebook' ? data.id : provider === 'google' && data.sub 
        setSocial({
            provider: `${provider}Id`,
            [`${provider}Id`]: socialId,
            email: data.email,
            fullname: data.name,
        })

        _checkSocial({
            variables: {
                id: socialId,
                provider: provider
            }
        })
    }
    const onReject = err => {
        console.log(err)
    }


    return (
        <Button circle={circle} noSize >
            <Component
                // For Facebook
                appId={facebookBool ? process.env.REACT_APP_FACEBOOK_APP_ID || '' : ''}
                version={facebookBool ? process.env.REACT_APP_FACEBOOK_APP_VERSION || '' : null}
                fieldsProfile={facebookBool ? scope || facebookScope : null}
                onLogoutSuccess={facebookBool ? onLogoutSuccess : null}

                // For Google
                client_id={googleBool ? process.env.REACT_APP_GOOGLE_CLIENT_ID || '' : ''}
                scope={googleBool ? scope || googleScope : null}
                discoveryDocs={googleBool ? 'claims_supported' : null}
                access_type={googleBool ? 'offline' : null}

                onLoginStart={onLoginStart}
                redirect_uri={redirect_uri}
                onResolve={onResolve}
                onReject={onReject}

                className='circle btn-text '
            >
                {text.length ? text : children}
                {icon && <Icon className='btn-icon' />}
            </Component>
        </Button>
    )
}

SocialButton.defaultProps = {
    icon: false,
    className: '',
    text: '',
}

export default SocialButton
