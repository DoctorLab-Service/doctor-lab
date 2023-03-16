import { useState } from "react"

declare global {
    interface Window {
        FB: any
        fbAsyncInit: any
    }
}

export const useFacebook = () => {
    const [facebookResponse, setFacebookResponse] = useState({})

    // Process login and get user data from facebook
    const login = () => {
        window.FB.api('/me', { fields: 'name,email,picture'}, response => {
            console.log(1, response) 
            console.log(1, window.FB.getAuthResponse()) 
        })
    }

    // Initial Facebook SDK
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: '130033080004073',
            cookie: true,
            xfbml: true,
            version: 'v16.0'
        });
    };


    // Use response and call login method for auth by facebook
    const statusChangeCallback = (response) => {
        console.log(response)

        if (response.status === 'connected') {
            login()
        } else {
            if (response.status === 'unknown') {
                window.FB.login(response => {
                    if (response.authResponse) {
                        login()
                    } else {
                        console.log('Facebook login failed')
                    }
                }, { auth_type: 'reauthorize' })
            }
        }
    }


    // Action to login with facebook
    const facebookLogin = () => {
        // window.FB.login(function (response) {
        //     if (response.authResponse) {
        //         console.log('Вы авторизовались и получили доступ к приложению.');
        //     } else {
        //         console.log('Не удалось выполнить вход.');
        //     }
        // }, { scope: 'name,email,picture' });
        window.FB.getLoginStatus(response => {
            statusChangeCallback(response)
        })
    }

    // Action to logout from facebook
    const facebookLogout = () => {
        window.FB.logout(response => {
            console.log(response)
            setFacebookResponse({})

        })
    }


    // Upload Facebook SDK
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    return {
        facebookLogin,
        facebookLogout,
        facebookResponse
    }

    // // Process login and get user data from facebook
    // const login = () => {
    //     window.FB.api('/me', { fields: 'name,email,picture'}, response => {
    //         console.log(1, response) 
    //         console.log(1, window.FB.getAuthResponse()) 
    //     })
    // }



    


    // // Action to logout from facebook
    // const facebookLogout = () => {
    //     window.FB.logout(response => {
    //         console.log(response)
    //         setFacebookResponse({})

    //     })
    // }


}


