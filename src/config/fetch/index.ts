import { useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { sessionManager } from "@/config/session-manager";
import jwtDecode from "jwt-decode";

export const baseURL = "https://api.strateegia.digital";

const httpClient = axios.create({
  baseURL,
  // withCredentials: true,
});

const updateToken = async () => {
  return await axios
    .request({
      url: `${baseURL}/users/v1/auth/refresh`,
      method: "POST",
      // withCredentials: true,
    })
    .then((res) => {
      const decodedToken = jwtDecode<{ exp: number }>(res.data.access_token);
      sessionManager.updateSession(decodedToken.exp, res.data.access_token);
    });
};

httpClient.interceptors.request.use(async (request) => {
  const skipAuth = request.url?.match(/auth|signup|password-recovery/);

  if (skipAuth) {
    return request;
  }

  if (!sessionManager.hasSession()) {
    const previousURL = window.location.pathname;
    sessionStorage.setItem("previousURL", previousURL);
    window.location.replace(`/login`);
    return request;
  }

  if (sessionManager.isExpired()) {
    await updateToken();
  }

  const session = sessionManager.getSession();
  const accessToken = session?.token;

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

const fetch = <T>(requestConfig: AxiosRequestConfig) => {
  return httpClient.request<unknown, AxiosResponse<T>>({
    ...requestConfig,
    withCredentials: true,
  });
};

type Params = {
  onSuccess?: (response: AxiosResponse) => AxiosResponse;
  onError?: (error: AxiosError) => void;
};

export function useResponseInterceptor({ onSuccess, onError }: Params) {
  useEffect(() => {
    httpClient.interceptors.response.use(onSuccess, onError);
  }, [onError, onSuccess]);
}

export default fetch;
