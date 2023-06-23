import { gql } from "graphql.macro";


export const MUTATION_CHANGE_PASSWORD = gql`
mutation ChangePassword (
        $password: String!
        $rePassword: String!
    ) {
        changePassword(
            input: {
                password: $password,
                rePassword: $rePassword,
            }
        ) {
            ok
        }
    }
`