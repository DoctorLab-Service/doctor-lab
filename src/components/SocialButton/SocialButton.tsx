import { FacebookSVG, GoogleSVG } from 'assets/icons'
import { Button } from 'components/ui'
import { FC } from 'react'
import { LoginSocialFacebook, LoginSocialGoogle, IResolveParams } from 'reactjs-social-login'
import { SocialButtonProps } from 'types/props'


const SocialButton: FC<SocialButtonProps> = ({ redirect_uri, circle,  children, className, onLogoutSuccess, onLoginStart, scope, provider, icon, text }) => {
    // Default Scopes
    const facebookScope = 'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
    const googleScope = 'openid profile email'

    const facebookBool = provider === 'facebook'
    const googleBool = provider === 'google'

    // Set Component
    const Component = facebookBool ? LoginSocialFacebook : googleBool && LoginSocialGoogle
    const Icon = facebookBool ? FacebookSVG : googleBool && GoogleSVG

    // Methods
    const onResolve = ({ provider, data }: IResolveParams) => {
        console.log('provider', provider)
        console.log('data', data)
        // setProvider(provider)
        // setProfile(data)
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
