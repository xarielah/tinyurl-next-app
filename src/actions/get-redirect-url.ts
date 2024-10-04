"use server";

import { appConfig } from "@/lib/appConfig";

export const getRedirectURL = async (shortenId: string) => {
  try {
    const url = appConfig.apiBaseUrl + `/redirect/${shortenId}`;
    const result = await fetch(url, { method: "POST" });
    if (result.ok) {
      const data = await result.json();
      return { url: data.url, error: data.error };
    }
    throw new Error("Failed to get redirect URL");
  } catch (error) {
    return { error: (error as any).message };
  }
};
