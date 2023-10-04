import { gql } from "graphql.macro";

export const MUTATION_VERIFICATION_PASSWORD_RECOVERY = gql`
    mutation VerificationPasswordRecovery($code: String!) {
        verificationPasswordRecovery(
            input: {code: $code}
        ) {
            ok
            token
        }
    }
`
