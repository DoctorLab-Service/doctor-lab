import { gql } from "graphql.macro";


export const MUTATION_CREATE_HELP_MESSAGE = gql`
    mutation CreateHelpMessage(
        $fullname: String!
        $email: String!
        $title: String!
        $text: String!
    ) {
        createHelpMessage(
            input: {
                fullname: $fullname
                email: $email
                title: $title
                text: $text
            }
        ) {
            ok
            message {
            id
            fullname
            email
            title
            text
            read
            closed
            }
        }
    }
`
