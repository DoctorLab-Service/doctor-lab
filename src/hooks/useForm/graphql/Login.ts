import { gql } from "graphql.macro"

export const MUTATION_LOGIN = gql`
    mutation Login(
        $email: String
        $phone: String
        $googleId: String
        $facebookId: String
        $password: String!
        $role: EDefaultRoles!
    ) {
        login(input: {
            email: $email,
            password: $password,
            phone: $phone,
            facebookId: $facebookId,
            googleId: $googleId,
            role: $role,
    })  {
            ok
            accessToken
            user {
                id
                email
                phone
            }
        }
    }
`