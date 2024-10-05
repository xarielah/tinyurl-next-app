import { appConfig } from "@/lib/appConfig";
import { axiosClient } from "./axios.client";

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
  // return axiosClient.post("/auth/login", data);
  return fetch(appConfig.apiBaseUrl + "/auth/login", {
    body: JSON.stringify(data),
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
}

export function register(data: IRegisterPayload) {
  return axiosClient.post("/auth/register", data);
}
