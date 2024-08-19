import fetch from "@/config/fetch";
import { sessionManager } from "@/config/session-manager";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { AuthenticationParams, TokenModel } from "@/types/auth-model";
import jwtDecode from "jwt-decode";

export const auth = async ({
  email,
  password,
  keepConnected = false,
}: AuthenticationParams) => {
  return fetch<TokenModel>({
    url: "/users/v1/auth/signin",
    method: "POST",
    auth: {
      username: email,
      password,
    },
    data: {
      keep_connected: keepConnected,
    },
  })
    .then((res) => {
      const token = jwtDecode<{ exp: number }>(res.data.access_token);
      sessionManager.startSession(
        keepConnected,
        token.exp,
        res.data.access_token
      );

      return res.data;
    })
    .catch(() => {
      throw new InvalidCredentialsError();
    });
};

export const logout = async () => {
  const session = sessionManager.getSession();
  const accessToken = session?.token;

  if (accessToken) {
    return await fetch({
      url: "/users/v1/auth/logout",
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(() => {
      sessionManager.endSession();
    });
  } else {
    // If no token is found, end the session directly
    sessionManager.endSession();
  }
};
