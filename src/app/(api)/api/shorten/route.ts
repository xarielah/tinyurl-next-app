import * as shortenService from "@/services/shorten.service";
import { cookies } from "next/headers";
import { ShortenActions } from "../../actions";

export interface ProxyLikeRequest {
  action: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  payload: any;
}

export async function POST(req: Request) {
  const access_token = cookies().get("access_token")?.value || "";
  if (!access_token) {
    return Response.json({ message: "No access token" }, { status: 401 });
  }
  const body = await req.json();
  const payload = body.payload;
  const action = body.action;
  // Create new shortened link
  if (action === ShortenActions.CREATE_NEW) {
    const result = await shortenService
      .createShortenURLExtrenal(payload?.url, access_token)
      .then((res) => res.data)
      .catch((error) => error);
    if (result?.status === 401) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    return Response.json(result);
    // Get all user's shortened links
  } else if (action === ShortenActions.GET_ALL) {
    const result = await shortenService
      .getShortenedLinksExternal(access_token)
      .then((res) => res.data)
      .catch((error) => error);
    if (result?.status === 401) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    return Response.json(result);

    // Delete one
  } else if (action === ShortenActions.DELETE_ONE) {
    const result = await shortenService
      .deleteShortenedLinkExternal(payload?.shortId, access_token)
      .then((res) => res.data)
      .catch((error) => error);
    if (result?.status === 401) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    return Response.json(result);
  } else {
    return Response.json(
      { message: "Actions is not allowed" },
      { status: 400 }
    );
  }
}
