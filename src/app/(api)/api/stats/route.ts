import * as shortenService from "@/services/shorten.service";
import { cookies } from "next/headers";
import { StatsActions } from "../../actions";

export async function POST(req: Request) {
  const access_token = cookies().get("access_token")?.value || "";
  if (!access_token) {
    return Response.json({ message: "No access token" }, { status: 401 });
  }
  const body = await req.json();
  const payload = body.payload;
  const action = body.action;

  if (action === StatsActions.GET_REPORTS) {
    const result = await shortenService
      .getReportsByShortIdExternal(payload?.shortId, access_token)
      .then((res) => res.data)
      .catch((error) => error);
    if (result?.status === 401) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    return Response.json(result);
  }
  return Response.json({ message: "Hello, world!" });
}
