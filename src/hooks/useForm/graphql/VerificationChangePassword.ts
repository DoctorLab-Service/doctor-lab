import { gql } from "graphql.macro";

export const MUTATION_VERIFICATION_CHANGE_PASSWORD = gql`
    mutation VerificationChangePassword {
        verificationChangePassword(input: {code: "252525"}) {
            ok
        }
    }
`