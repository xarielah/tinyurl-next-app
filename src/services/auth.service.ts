import { AxiosResponse } from "axios";
import { axiosInternal } from "./axios-internal.client";
import { axiosClient } from "./axios.client";

export type ILoginPayload = {
  username: string;
  password: string;
};

export type IRegisterPayload = {
  email: string;
} & ILoginPayload;

type Tokens = {
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
