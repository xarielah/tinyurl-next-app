import axios from "axios";

export const axiosInternal = axios.create({
  withCredentials: true,
});
