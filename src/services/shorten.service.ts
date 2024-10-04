import { ShortenLink } from "@/app/(pages)/dashboard/(page-components)/data-table.types";
import { AxiosResponse } from "axios";
import { axiosClient } from "./axios.client";

export function createShortenURL(url: string) {
  return axiosClient.post("/shorten/new", { url: url });
}

export function getShortenedLinks() {
  return axiosClient.post<ShortenLink[]>("/shorten");
}

export function getReportsByShortId(shortId: string) {
  return axiosClient.get(`/stats/${shortId}`);
}

export function getRedirectData(
  shortId: string
): Promise<AxiosResponse<{ url: string }>> {
  return axiosClient.post(`/redirect/${shortId}`);
}
