import { RedirectPayload } from "@/services/shorten.models";
import * as shortenService from "@/services/shorten.service";
import { geolocation } from "@vercel/functions";
import { cookies } from "next/headers";
import { RedirectActions } from "../../actions";

export async function POST(req: Request) {
  try {
    const access_token = cookies().get("access_token")?.value || "";
    if (!access_token) {
      return Response.json({ message: "No access token" }, { status: 401 });
    }
    const body = await req.json();
    const payload = body.payload;
    const action = body.action;
    if (action === RedirectActions.GET_REDIRECT) {
      const { country, city, latitude, longitude } = geolocation(req);
      const redirectPayload: RedirectPayload = {
        shortId: payload.shortId,
        locationInformation: {
          country: country || "",
          city: city || "",
          latitude: latitude || "",
          longitude: longitude || "",
        },
      };
      const result = await shortenService.getRedirectDataExternal(
        redirectPayload,
        access_token
      );
      const resposeDto = {
        url: result.data.url || null,
      };
      return Response.json(resposeDto);
    } else {
      return Response.json(
        { message: "Actions is not allowed" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("handleRedirect - /api/redirect: " + error.message);
    return Response.json(
      { message: "An error occured trying to fulfill the request" },
      { status: error.response?.status || 500 }
    );
  }
}
