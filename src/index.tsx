import App from 'App'
import { Notifications, Title } from 'components'
import { StrictMode } from 'react'
import { client } from 'core/graphql'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'store'

import reportWebVitals from './reportWebVitals'

import 'utils/reset-transition'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <StrictMode>
        <ApolloProvider client={client}>
            <ReduxProvider store={store}>
                <Router>
                    <HelmetProvider>
                        <Title />
                        <App />
                        <Notifications />
                    </HelmetProvider>
                </Router>  
            </ReduxProvider>
        </ApolloProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
