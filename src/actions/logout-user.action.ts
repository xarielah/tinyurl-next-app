"use server";
import { cookies } from "next/headers";

export default async function logout() {
  try {
    const accessToken = cookies().get("access_token")?.value || "";
    await fetch("http://localhost:3000/api/auth/logout", {
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
