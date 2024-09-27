"use server";

import { cookies } from "next/headers";

export const getSessionAction = async () => {
  try {
    const accessToken = cookies().get("access_token")?.value || "";
    const result = await fetch("http://localhost:3000/api/auth/session", {
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
