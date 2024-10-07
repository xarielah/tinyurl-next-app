import { AxiosResponse } from "axios";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { axiosInternal } from "./axios-internal.client";
import { axiosClient } from "./axios.client";

export type ILoginPayload = {
  username: string;
  password: string;
};

export type SessionUser = {
  email: string;
  username: string;
};

export type IRegisterPayload = {
  email: string;
} & ILoginPayload;

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export async function login(
  data: ILoginPayload
): Promise<AxiosResponse<Tokens>> {
  return axiosClient.post("/auth/login", data);
}

export function register(
  data: IRegisterPayload
): Promise<AxiosResponse<Tokens>> {
  return axiosClient.post("/auth/register", data);
}

export function loginInternal(
  data: ILoginPayload
): Promise<AxiosResponse<void>> {
  return axiosInternal.post("/api/auth/login", data);
}

export function registerInternal(
  data: IRegisterPayload
): Promise<AxiosResponse<void>> {
  return axiosInternal.post("/api/auth/register", data);
}

export function session(token: string) {
  return axiosClient.post<SessionUser>("/auth/session", null, {
    headers: {
      "X-Auth-Token": token,
    },
  });
}

export function refreshToken(token: string) {
  return axiosClient.post<{ access_token: string }>("/auth/refresh", null, {
    headers: {
      "X-Auth-Token": token,
    },
  });
}

export async function sessionInteral() {
  return axiosInternal.post<SessionUser>("/api/auth/details");
}

export function refreshTokenInternal(token: string) {
  return axiosClient.post("/auth/refresh", null, {
    headers: {
      "X-Auth-Token": token,
    },
  });
}

export const accessCookieOptions: Partial<ResponseCookie> = {
  secure: true,
  httpOnly: true,
  sameSite: "none",
  maxAge: 60 * 60 * 1000,
};

export const refreshCookieOptions: Partial<ResponseCookie> = {
  secure: true,
  httpOnly: true,
  sameSite: "none",
  maxAge: 60 * 60 * 1000 * 24,
};
