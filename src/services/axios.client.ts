import { appConfig } from "@/lib/appConfig";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  withCredentials: true,
});
