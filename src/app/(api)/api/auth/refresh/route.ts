import { cookies } from "next/headers";

export default function POST(req: Request) {
  const c = cookies();
  const refreshToken = c.get("refresh_token")?.value || "";
  if (!refreshToken) {
    return Response.json({ message: "No refresh token" }, { status: 401 });
  }
  return Response.json({ message: "Hello, world!" });
}
