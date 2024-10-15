import * as authService from "@/services/auth.service";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const cookieSettings: Partial<ResponseCookie> = {
  secure: true,
  httpOnly: true,
};

export async function POST(req: Request) {
  try {
    // Handle register
    const body = await req.json();
    const payloadRegister = {
      email: body.email || "",
      username: body.username || "",
      password: body.password || "",
    };
    const result = await authService.register(payloadRegister);
    if (result.status !== 201)
      return Response.json(result.data as unknown as { message: string }, {
        status: 401,
      });
    const c = cookies();
    const { access_token, refresh_token } = result.data;
    c.set("access_token", access_token, {
      ...cookieSettings,
      maxAge: 60 * 60 * 1000,
    });
    c.set("refresh_token", refresh_token, {
      ...cookieSettings,
      maxAge: 60 * 60 * 24 * 1000,
    });
    return Response.json({ message: "Register successful" }, { status: 201 });
  } catch (error: any) {
    const possiblyErrors = error.response.data.errors;
    const payload = Array.isArray(possiblyErrors)
      ? possiblyErrors
      : "An error occurred. Please try again.";
    return Response.json({ errors: payload }, { status: error.status });
  }
}
