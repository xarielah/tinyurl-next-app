"use server";

import { appConfig } from "@/lib/appConfig";
import { cookies } from "next/headers";

export const getSessionAction = async () => {
  try {
    const accessToken = cookies().get("access_token")?.value || "";
    console.log(cookies().getAll());
    const result = await fetch(appConfig.apiBaseUrl + "/auth/session", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-Auth-Token": accessToken,
      },
    });
    if (result.ok) {
      const data = await result.json();
      return { data };
    }
    throw new Error("Failed to get session");
  } catch (error) {
    return { error: (error as any).message };
  }
};
