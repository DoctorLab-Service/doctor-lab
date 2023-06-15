import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from 'App'

import reportWebVitals from './reportWebVitals'
import { HelmetProvider } from 'react-helmet-async'
import { Title } from 'components'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <StrictMode>
        <Router>
            <HelmetProvider>
                <Title />
                <App />
            </HelmetProvider>
        </Router>  
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
