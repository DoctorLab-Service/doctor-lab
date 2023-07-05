import { gql } from 'graphql.macro'

export const MUTATION_CHECK_SOCIAL = gql`
    mutation CheckSocial($provider: String!, $id: String!) {
        checkSocial(input: { provider: $provider, id: $id }) {
            ok
            accessToken
        }
    }
` 