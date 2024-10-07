import * as authService from "@/services/auth.service";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  // Handle login
  const body = await req.json();
  const result = await authService.login({
    username: body.username || "",
    password: body.password || "",
  });
  if (result.status !== 200)
    return Response.json({ message: "Login failed" }, { status: 401 });
  const { access_token, refresh_token } = result.data;

  const c = cookies();
  c.set("access_token", access_token, authService.accessCookieOptions);
  c.set("refresh_token", refresh_token, authService.refreshCookieOptions);
  return Response.json({ message: "Login successful" });
}
