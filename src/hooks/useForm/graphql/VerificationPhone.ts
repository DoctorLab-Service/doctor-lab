import { gql } from "graphql.macro";


export const MUTATION_VERIFICATION_PHONE = gql`
    mutation VerificationPhone (
        $code: String!
    ) {
        verificationPhone(input: {code: $code}) {
            ok
        }
    }

`