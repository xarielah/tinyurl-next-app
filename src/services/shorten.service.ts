import { ShortenActions, StatsActions } from "@/app/(api)/actions";
import { ShortenLink } from "@/app/(pages)/dashboard/(page-components)/data-table.types";
import { AxiosResponse } from "axios";
import { axiosInternal } from "./axios-internal.client";
import { axiosClient } from "./axios.client";

// Helper function

function _getTokenHeader(token: string) {
  return {
    headers: {
      "X-Auth-Token": token,
      "Content-Type": "application/json",
    },
  };
}

// External API calls

export function createShortenURLExtrenal(url: string, token: string) {
  return axiosClient.post<{ id: string; url: string; shortId: string }>(
    "/shorten/new",
    { url: url },
    _getTokenHeader(token)
  );
}

export function getShortenedLinksExternal(token: string) {
  return axiosClient.post<ShortenLink[]>(
    "/shorten",
    {},
    _getTokenHeader(token)
  );
}

export function getReportsByShortIdExternal(shortId: string, token: string) {
  return axiosClient.get(`/stats/${shortId}`, _getTokenHeader(token));
}

export function deleteShortenedLinkExternal(shortId: string, token: string) {
  return axiosClient.delete(`/shorten/${shortId}`, _getTokenHeader(token));
}

// Internal Next.js API calls

export function createShortenURL(url: string) {
  return axiosInternal.post("/api/shorten", {
    action: ShortenActions.CREATE_NEW,
    payload: { url },
  });
}

export function getShortenedLinks() {
  return axiosInternal.post<ShortenLink[]>("/api/shorten", {
    action: ShortenActions.GET_ALL,
    payload: {},
  });
}

export function deleteShortenedLink(shortId: string) {
  return axiosInternal.post(`/api/shorten/`, {
    action: ShortenActions.DELETE_ONE,
    payload: { shortId },
  });
}

export function getReportsByShortId(shortId: string) {
  return axiosInternal.post(`/api/stats`, {
    action: StatsActions.GET_REPORTS,
    payload: { shortId },
  });
}

// Public, allowed anonymously
export function getRedirectData(
  shortId: string
): Promise<AxiosResponse<{ url: string }>> {
  return axiosClient.post(`/redirect/${shortId}`);
}
