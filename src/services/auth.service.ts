import { axiosClient } from "./axios-client";

export type ILoginPayload = {
  username: string;
  password: string;
};

export type IRegisterPayload = {
  email: string;
} & ILoginPayload;

export function getSession() {
  return axiosClient.post("/auth/session");
}

export function login(data: ILoginPayload) {
  return axiosClient.post("/auth/login", data);
}

export function register(data: IRegisterPayload) {
  return axiosClient.post("/auth/register", data);
}
