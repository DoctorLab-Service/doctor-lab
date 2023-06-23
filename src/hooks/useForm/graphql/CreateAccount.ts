import { gql } from 'graphql.macro'

export const MUTATION_CREATE_ACCOUNT = gql`
    mutation CreateAccount(
        $fullname: String!,
        $phone: String!,
        $email: String!,
        $password: String!,
        $rePassword: String!,
        $role: EDefaultRoles!
    ) {
        createAccount(
            input: {
                fullname: $fullname,
                phone: $phone,
                email: $email,
                password: $password,
                rePassword: $rePassword,
                role: $role,
            }
        ) {
            ok
            accessToken
        }
    }
`
