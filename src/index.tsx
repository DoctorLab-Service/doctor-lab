import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/client'
import { Title } from 'components'
import App from 'App'

import reportWebVitals from './reportWebVitals'

import { client } from 'core/graphql'
import 'utils/reset-transition'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <StrictMode>
        <ApolloProvider client={client}>
            <Router>
                <HelmetProvider>
                    <Title />
                    <App />
                </HelmetProvider>
            </Router>  
        </ApolloProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
