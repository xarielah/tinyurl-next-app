import * as authService from "@/services/auth.service";
import { cookies } from "next/headers";
export async function POST(req: Request) {
  const c = cookies();
  try {
    const access_token = c.get("access_token")?.value || "";
    const result = await authService.session(access_token);
    return Response.json(result.data);
  } catch (error: any) {
    const refresh_token = c.get("refresh_token")?.value || "";
    if (refresh_token) {
      const refreshData = await authService
        .refreshToken(refresh_token)
        .then((res) => res.data)
        .catch(() => null);
      if (refreshData && refreshData.access_token) {
        const newToken = refreshData.access_token;
        const session = await authService.session(newToken);
        c.set("access_token", newToken, authService.accessCookieOptions);
        const data = session.data;
        return Response.json(data);
      }
    }
    return Response.json({ error: (error as any).message }, { status: 401 });
  }
}
