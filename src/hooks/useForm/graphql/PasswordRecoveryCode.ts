import { gql } from "graphql.macro";


export const MUTATION_PASSWORD_RECOVERY_CODE = gql`
    mutation PasswordRecoveryCode ($email: String!) {
        passwordRecoveryCode(input: {email: $email}) {
            ok
        }
    }
`