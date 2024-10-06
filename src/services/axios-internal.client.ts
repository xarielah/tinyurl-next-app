import { appConfig } from "@/lib/appConfig";
import axios from "axios";

export const axiosInternal = axios.create({
  baseURL: appConfig.frontendUrl,
  withCredentials: true,
});
