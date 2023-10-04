// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// Slies Types
export interface IForms {
    login: Form 
    register: Form
    support: Form
    verification: Form
    forgot: Form
    changePassword: Form
}

export interface IFormState {
    forms: IForms
    validate: Validate
    defaultForm: IForms
    isChangePasswordForm: boolean
    state: ISetStateActionPayload
    confirmEmail: IConfirmEmailActionPayload
}


// SetForm Action
export interface IFormAction {
    payload: IFormPayload
    type: string
}
export interface IFormActionPayload {
    formName: string
    form?: IFormPayloadForm
}
export interface IFormActionPayloadForm {
    name?: string
    value?: string
}


// SetValidate Action
export interface IValidateAction {
    payload: Validate
    type: string
}
export interface IValidateActionPayload {
    name: string
    status: boolean
    message: string
}


// SetState Action
export interface IStateAction {
    payload: ISetStateActionPayload
    type: string
}
export interface IStateActionPayload {
    fields?: From
    errors?: any
    validate?: Validate
    accessToken?: string
}

// Set Is Change Password Form Action
export interface IIsChangePasswordFormAction {
    payload: boolean
}

//  Set Confirm Email Action
export interface IConfirmEmailAction {
    payload: IConfirmEmailActionPayload
}
export interface IConfirmEmailActionPayload {
    confirm?: boolean,
    status?: boolean,
    condition?: 'sended' | 'failed' | 'complited' | 'finished'
}

//  Set Confirm Email Action
export interface IChangeConfirmEmail {
    payload: boolean
}