"use server";
import { appConfig } from "@/lib/appConfig";
import { cookies } from "next/headers";

export default async function logout() {
  try {
    const accessToken = cookies().get("access_token")?.value || "";
    await fetch(appConfig.apiBaseUrl + "/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Auth-Token": accessToken,
      },
    });
    cookies().delete("access_token");
    cookies().delete("refresh_token");
  } catch (error) {
    console.log("err", error);
  }
}
