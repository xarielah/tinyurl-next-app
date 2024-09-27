import { ShortenLink } from "@/app/(pages)/dashboard/(page-components)/data-table";
import { axiosClient } from "./axios.client";

export function createShortenURL(url: string) {
  return axiosClient.post("/shorten/new", { url: url });
}

export function getShortenedLinks() {
  return axiosClient.post<ShortenLink[]>("/shorten");
}
