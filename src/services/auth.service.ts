import { appConfig } from "@/lib/appConfig";

export type ILoginPayload = {
  username: string;
  password: string;
};

export type IRegisterPayload = {
  email: string;
} & ILoginPayload;

export async function login(data: ILoginPayload) {
  // return axiosClient.post("/auth/login", data);
  return fetch(appConfig.apiBaseUrl + "/auth/login", {
    body: JSON.stringify(data),
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
}

export function register(data: IRegisterPayload) {
  return fetch(appConfig.apiBaseUrl + "/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
}
