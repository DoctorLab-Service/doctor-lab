// 
// const wsUri: string = `${PROTOCOL_WS}://${process.env.REACT_APP_SERVER_HOST}${process.env.REACT_APP_SERVER_GRAPHQL_SUBSCRIPTION_ENDPOINT}`
// Core
import {
    ApolloClient,
    ApolloLink,
    from,
    HttpLink,
    InMemoryCache,
    makeVar,
    NextLink,
    NormalizedCacheObject,
    Operation,
    ReactiveVar,
    split,
    concat,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { toast } from 'react-toastify'
import { localStorageKey } from 'core/localstorage'
import { paths } from 'core/routes'
import { getPagename } from 'hooks/usePaths'
import { getLanguage, getToken } from './helpers'


/**
 * isAuth /
 * return  true or false, by localStorage.getItem('jwt')
 */
export const isAuth: ReactiveVar<boolean> = makeVar<boolean>(!!localStorage.getItem(localStorageKey.token))

// const uri = `https://${process.env.REACT_APP_SERVER_HOST}${process.env.REACT_APP_SERVER_GRAPHQL_ENDPOINT}`
const uri = `http://localhost:8000/auth`
// const PROTOCOL_WS = window.location.protocol === 'https:' ? 'wss' : 'ws'
// const wsUri = `${PROTOCOL_WS}://${process.env.REACT_APP_SERVER_HOST}${process.env.REACT_APP_SERVER_GRAPHQL_SUBSCRIPTION_ENDPOINT}`



const authLink: ApolloLink = new ApolloLink((_operation: Operation, _forward: NextLink) => {
    const pagename = getPagename(paths())

    const isLogin = pagename === 'login'
    const isRegister = pagename === 'register'

    _operation.setContext(({ headers }) => {
        const customHeaders = isLogin || isRegister 
            ? {
                language: getLanguage(),
                ...headers
            }
            : {
                "x-jwt": getToken(), // however you get your token
                language: getLanguage(),
                ...headers
            }
        return {
            headers: customHeaders
        }
})
    return _forward(_operation)
})

/**
 * APOLLO: HttpLink \
 * Create HttpLink
 */
const httpLink: HttpLink = new HttpLink({ uri })



/**
 * WebSocketLink
 */
// const wsLink: WebSocketLink = new WebSocketLink({
//     uri: wsUri,
//     options: {
//         connectionParams: {
//             'x-jwt': getToken()
//         },
//         reconnect: true
//     }
// })

/**
 * Combine WSLink and httpLink
 * like filter for backend
 */
// const combineLinks: ApolloLink = split(
//     ({ query }) => {
//         const { kind, operation }: any = getMainDefinition(query)
//         return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     wsLink,
//     httpLink
// )

/**
 * ErrorLink
 * If exist error to show errors 
 * Show errors using toast.error
 */
const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, extensions: { exception } = {} }) => {
            // toast.error(`Unexpected error: ${exception}`)
            // console.log('Unexpected error:', exception)
            return 
        })
    }
    if (networkError) {
        // Show error if user networ or connection  with  server will down
        // toast.error(`Network error: ${networkError}`)
    }
})



/**
 * APOLLO: Link \
 * Create link, \
 * using authLink, and combineLinks with httpLink \
 * and wsLink, and errorLink
 */
const link: ApolloLink = from([
    errorLink,
    concat(authLink, httpLink)
    // concat(authLink, combineLinks)
])



/**
 * APOLLO: Create ApolloClient \
 * Create apollo Client and set Link server, and cache 
 */
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    // Cache initialization
    cache: new InMemoryCache(),
    link,
    credentials: 'include' // using cookies for login and session management with a backend
})

// Endpoint Client
export default client