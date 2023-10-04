// If use Graphql  files
// import { loader } from 'graphql.macro'

// export const MUTATION_CREATE_ACCOUNT = loader('./createAccount.gql')
// export const MUTATION_LOGIN = loader('./login.gql')


export { MUTATION_LOGIN } from './Login'

// Create Account
export { MUTATION_CREATE_ACCOUNT } from './CreateAccount'
export { MUTATION_VERIFICATION_PHONE } from './VerificationPhone'

export { MUTATION_CREATE_HELP_MESSAGE } from './CreateHelpMessage'


// ChangePassword
export { MUTATION_CHANGE_PASSWORD } from './ChangePassword'
export { MUTATION_PASSWORD_RECOVERY_CODE } from './PasswordRecoveryCode'
export { MUTATION_VERIFICATION_PASSWORD_RECOVERY } from './VerificationPasswordRecovery'
