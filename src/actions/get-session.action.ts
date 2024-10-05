"use server";

import { axiosClient } from "@/services/axios.client";
import { cookies } from "next/headers";

export const getSessionAction = async () => {
  try {
    const accessToken = cookies().get("access_token")?.value || "";
    const result = await axiosClient.post("/auth/session", null, {
      headers: {
        "X-Auth-Token": accessToken,
      },
    });
    if (result.status === 200) {
      return { data: result.data };
    }
    throw new Error("Failed to get session");
  } catch (error) {
    return { error: (error as any).message };
  }
};
