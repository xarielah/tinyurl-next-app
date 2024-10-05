import * as authService from "@/services/auth.service";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  // Handle login
  const body = await req.json();
  const result = await authService.login({
    username: body.username || "",
    password: body.password || "",
  });
  if (result.status != 200)
    return Response.json({ message: "Login failed" }, { status: 401 });
  const data = await result.json();
  const { access_token, refresh_token } = data;
  const cookieOptions = {
    secure: true,
    httpOnly: true,
  };
  const c = cookies();
  c.set("access_token", access_token, cookieOptions);
  c.set("refresh_token", refresh_token, cookieOptions);
  return Response.json({ message: "Login successful" });
}
