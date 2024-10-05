import * as authService from "@/services/auth.service";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  // Handle register
  const body = await req.json();
  const payloadRegister = {
    email: body.email || "",
    username: body.username || "",
    password: body.password || "",
  };
  const result = await authService.register(payloadRegister);
  const data = await result.json();
  if (result.status != 201) return Response.json(data, { status: 401 });
  const c = cookies();
  c.set("access_token", data.access_token, {
    secure: true,
    httpOnly: true,
  });
  c.set("refresh_token", data.refresh_token, {
    secure: true,
    httpOnly: true,
  });
  return Response.json({ message: "Register successful" });
}
