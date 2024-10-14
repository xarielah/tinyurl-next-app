import { RedirectPayload } from "@/services/shorten.models";
import * as shortenService from "@/services/shorten.service";
import { geolocation } from "@vercel/functions";
import { RedirectActions } from "../../actions";

export async function POST(req: Request) {
  try {
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
      const secret_redirect_key = process.env.SECRET_REDIRECT_KEY || "";
      const result = await shortenService.getRedirectDataExternal(
        redirectPayload,
        secret_redirect_key
      );
      const url = result.data.url;
      if (!url) throw new Error(`No URL found for ${payload.shortId}`);
      return Response.json({ url });
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
