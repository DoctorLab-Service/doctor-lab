import { gql } from 'graphql.macro';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AnswerToHelpMessageInput = {
  id: Scalars['Float']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type AnswerToHelpMessageOutput = {
  __typename?: 'AnswerToHelpMessageOutput';
  message?: Maybe<HelpAnswer>;
  ok: Scalars['Boolean']['output'];
};

export type ChangeEmailInput = {
  email: Scalars['String']['input'];
  reEmail: Scalars['String']['input'];
};

export type ChangeOutput = {
  __typename?: 'ChangeOutput';
  ok: Scalars['Boolean']['output'];
};

export type ChangeOutputCode = {
  __typename?: 'ChangeOutputCode';
  ok: Scalars['Boolean']['output'];
};

export type ChangePasswordInput = {
  password: Scalars['String']['input'];
  rePassword: Scalars['String']['input'];
};

export type ChangePhoneInput = {
  phone: Scalars['String']['input'];
};

export type CloseHelpMessageInput = {
  id: Scalars['Float']['input'];
};

export type CloseHelpMessageOutput = {
  __typename?: 'CloseHelpMessageOutput';
  message?: Maybe<HelpMessage>;
  ok: Scalars['Boolean']['output'];
};

export type CreateAccountInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  experience?: InputMaybe<Scalars['String']['input']>;
  facebookId?: InputMaybe<Scalars['String']['input']>;
  fullname: Scalars['String']['input'];
  gender?: InputMaybe<EGender>;
  googleId?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<ELanguage>;
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  rePassword: Scalars['String']['input'];
  role: EDefaultRoles;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  accessToken?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type CreateHelpMessageInput = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateHelpMessageOutput = {
  __typename?: 'CreateHelpMessageOutput';
  message?: Maybe<HelpMessage>;
  ok: Scalars['Boolean']['output'];
};

export type CreateRoleInput = {
  description: Scalars['String']['input'];
  role: Scalars['String']['input'];
  type?: InputMaybe<ERolesType>;
};

export type CreateRoleOutput = {
  __typename?: 'CreateRoleOutput';
  ok: Scalars['Boolean']['output'];
  role?: Maybe<Role>;
};

export type DeleteAccountOutput = {
  __typename?: 'DeleteAccountOutput';
  ok: Scalars['Boolean']['output'];
};

export type DeleteFilesInput = {
  id: Scalars['Float']['input'];
};

export type DeleteHelpMessageInput = {
  id: Scalars['Float']['input'];
};

export type DeleteHelpMessageOutput = {
  __typename?: 'DeleteHelpMessageOutput';
  ok: Scalars['Boolean']['output'];
};

export type DeleteRoleInput = {
  id: Scalars['Float']['input'];
};

export type DeleteRoleOutput = {
  __typename?: 'DeleteRoleOutput';
  ok: Scalars['Boolean']['output'];
};

export type DeleteUserRoleInput = {
  role: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};

export type DeleteUserRoleOutput = {
  __typename?: 'DeleteUserRoleOutput';
  ok: Scalars['Boolean']['output'];
};

export enum EDefaultRoles {
  Admin = 'admin',
  Dentist = 'dentist',
  Doctor = 'doctor',
  Patient = 'patient'
}

export enum EGender {
  Female = 'Female',
  Male = 'Male',
  NotChosen = 'NotChosen'
}

export enum ELanguage {
  En = 'EN',
  Ru = 'RU'
}

export enum ERolesType {
  Custom = 'custom',
  System = 'system'
}

export type FindAllHelpMessagesOutput = {
  __typename?: 'FindAllHelpMessagesOutput';
  messages: Array<HelpMessage>;
  ok: Scalars['Boolean']['output'];
};

export type FindAllRolesOutput = {
  __typename?: 'FindAllRolesOutput';
  ok: Scalars['Boolean']['output'];
  roles?: Maybe<Array<Role>>;
};

export type FindAllUsersOutput = {
  __typename?: 'FindAllUsersOutput';
  ok: Scalars['Boolean']['output'];
  users?: Maybe<Array<User>>;
};

export type FindByEmailInput = {
  email: Scalars['String']['input'];
};

export type FindByIdInput = {
  id: Scalars['Float']['input'];
};

export type FindByOutput = {
  __typename?: 'FindByOutput';
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type FindByPhoneInput = {
  phone: Scalars['String']['input'];
};

export type FindHelpMessageByIdInput = {
  id: Scalars['Float']['input'];
};

export type FindHelpMessageByIdOutput = {
  __typename?: 'FindHelpMessageByIdOutput';
  message?: Maybe<HelpMessage>;
  ok: Scalars['Boolean']['output'];
};

export type HelpAnswer = {
  __typename?: 'HelpAnswer';
  _v: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  message: User;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type HelpMessage = {
  __typename?: 'HelpMessage';
  _v: Scalars['Float']['output'];
  answers: Array<HelpAnswer>;
  closed: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  read: Scalars['Boolean']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  facebookId?: InputMaybe<Scalars['String']['input']>;
  googleId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role: EDefaultRoles;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type LogoutOutput = {
  __typename?: 'LogoutOutput';
  ok: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  answerToHelpMessage: AnswerToHelpMessageOutput;
  changeEmail: ChangeOutput;
  changeEmailCode: ChangeOutputCode;
  changePassword: ChangeOutput;
  changePasswordCode: ChangeOutputCode;
  changePhone: ChangeOutput;
  changePhoneCode: ChangeOutputCode;
  closeHelpMessage: CloseHelpMessageOutput;
  createAccount: CreateAccountOutput;
  createHelpMessage: CreateHelpMessageOutput;
  createRole: CreateRoleOutput;
  deleteAccount: DeleteAccountOutput;
  deleteFiles: UploadFilesOutput;
  deleteHelpMessage: DeleteHelpMessageOutput;
  deleteRole: DeleteRoleOutput;
  deleteUserRole: DeleteUserRoleOutput;
  login: LoginOutput;
  logout: LogoutOutput;
  passwordRecoveryCode: RecoveryOutput;
  readHelpMessage: ReadHelpMessageOutput;
  refreshToken: RefreshTokenOutput;
  setUserRole: SetUserRoleOutput;
  updateAccount: UpdateAccountOutput;
  updateRole: UpdateRoleOutput;
  uploadFile: UploadFilesOutput;
  uploadFiles: UploadFilesOutput;
  verificationChangeEmail: VerificationOutput;
  verificationChangePassword: VerificationOutput;
  verificationChangePhone: VerificationOutput;
  verificationEmail: VerificationOutput;
  verificationPasswordRecovery: VerificationOutput;
  verificationPhone: VerificationOutput;
};


export type MutationAnswerToHelpMessageArgs = {
  input: AnswerToHelpMessageInput;
};


export type MutationChangeEmailArgs = {
  input: ChangeEmailInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationChangePhoneArgs = {
  input: ChangePhoneInput;
};


export type MutationCloseHelpMessageArgs = {
  input: CloseHelpMessageInput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateHelpMessageArgs = {
  input: CreateHelpMessageInput;
};


export type MutationCreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationDeleteFilesArgs = {
  input: DeleteFilesInput;
};


export type MutationDeleteHelpMessageArgs = {
  input: DeleteHelpMessageInput;
};


export type MutationDeleteRoleArgs = {
  input: DeleteRoleInput;
};


export type MutationDeleteUserRoleArgs = {
  input: DeleteUserRoleInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPasswordRecoveryCodeArgs = {
  input: PasswordRecoveryCodeInput;
};


export type MutationReadHelpMessageArgs = {
  input: ReadHelpMessageInput;
};


export type MutationSetUserRoleArgs = {
  input: SetUserRoleInput;
};


export type MutationUpdateAccountArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  input: UpdateAccountInput;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationUploadFilesArgs = {
  files: Array<Scalars['Upload']['input']>;
};


export type MutationVerificationChangeEmailArgs = {
  input: VerificationInput;
};


export type MutationVerificationChangePasswordArgs = {
  input: VerificationInput;
};


export type MutationVerificationChangePhoneArgs = {
  input: VerificationInput;
};


export type MutationVerificationEmailArgs = {
  input: VerificationInput;
};


export type MutationVerificationPasswordRecoveryArgs = {
  input: VerificationInput;
};


export type MutationVerificationPhoneArgs = {
  input: VerificationInput;
};

export type MyAccountOutput = {
  __typename?: 'MyAccountOutput';
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type PasswordRecoveryCodeInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  findAllHelpMessages: FindAllHelpMessagesOutput;
  findAllRoles: FindAllRolesOutput;
  findAllUsers: FindAllUsersOutput;
  findByEmail: FindByOutput;
  findById: FindByOutput;
  findByPhone: FindByOutput;
  findHelpMessageById: FindHelpMessageByIdOutput;
  myAccount: MyAccountOutput;
};


export type QueryFindByEmailArgs = {
  input: FindByEmailInput;
};


export type QueryFindByIdArgs = {
  input: FindByIdInput;
};


export type QueryFindByPhoneArgs = {
  input: FindByPhoneInput;
};


export type QueryFindHelpMessageByIdArgs = {
  input: FindHelpMessageByIdInput;
};

export type ReadHelpMessageInput = {
  id: Scalars['Float']['input'];
};

export type ReadHelpMessageOutput = {
  __typename?: 'ReadHelpMessageOutput';
  message?: Maybe<HelpMessage>;
  ok: Scalars['Boolean']['output'];
};

export type RecoveryOutput = {
  __typename?: 'RecoveryOutput';
  ok: Scalars['Boolean']['output'];
};

export type RefreshTokenOutput = {
  __typename?: 'RefreshTokenOutput';
  accessToken?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Role = {
  __typename?: 'Role';
  _v: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  role: Scalars['String']['output'];
  roleKey: Scalars['String']['output'];
  type: ERolesType;
  updatedAt: Scalars['DateTime']['output'];
};

export type SetUserRoleInput = {
  role: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};

export type SetUserRoleOutput = {
  __typename?: 'SetUserRoleOutput';
  ok: Scalars['Boolean']['output'];
  role?: Maybe<Role>;
  user?: Maybe<User>;
};

export type UpdateAccountInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthdate?: InputMaybe<Scalars['DateTime']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  experience?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<EGender>;
  language?: InputMaybe<ELanguage>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAccountOutput = {
  __typename?: 'UpdateAccountOutput';
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ERolesType>;
};

export type UpdateRoleOutput = {
  __typename?: 'UpdateRoleOutput';
  ok: Scalars['Boolean']['output'];
  role?: Maybe<Role>;
};

export type UploadFilesOutput = {
  __typename?: 'UploadFilesOutput';
  ok: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  _v: Scalars['Float']['output'];
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birthdate?: Maybe<Scalars['DateTime']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdRoles: Array<Role>;
  email: Scalars['String']['output'];
  experience: Scalars['String']['output'];
  facebookId: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  gender: EGender;
  googleId: Scalars['String']['output'];
  helpMessage: Array<HelpMessage>;
  id: Scalars['Float']['output'];
  language: ELanguage;
  password: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  roles: Array<UserRoles>;
  setRoles: Array<UserRoles>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  verifiedEmail: Scalars['Boolean']['output'];
  verifiedPhone: Scalars['Boolean']['output'];
};

export type UserRoles = {
  __typename?: 'UserRoles';
  _v: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  role: Role;
  setTheRole?: Maybe<User>;
  type: ERolesType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type VerificationInput = {
  code: Scalars['String']['input'];
};

export type VerificationOutput = {
  __typename?: 'VerificationOutput';
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};
