export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<TokenModel>
}

export type AuthenticationParams = {
  email: string
  password: string
  keepConnected: boolean
}

export type TokenModel = {
  access_token: string
  refresh_token: string
}
