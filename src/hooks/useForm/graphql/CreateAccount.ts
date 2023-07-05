import { gql } from 'graphql.macro'

export const MUTATION_CREATE_ACCOUNT = gql`
    mutation CreateAccount(
        $fullname: String!,
        $phone: String!,
        $email: String!,
        $password: String!,
        $rePassword: String!,
        $role: EDefaultRoles!
        $googleId: String
        $facebookId: String
    ) {
        createAccount(
            input: {
                fullname: $fullname,
                phone: $phone,
                email: $email,
                password: $password,
                rePassword: $rePassword,
                role: $role,
                googleId: $googleId,
                facebookId: $facebookId,
            }
        ) {
            ok
            accessToken
        }
    }
`
