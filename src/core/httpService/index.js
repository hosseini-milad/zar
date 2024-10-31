import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import router from "@/router";
import { getUser } from "@core/storageService";

// eslint-disable-next-line react-hooks/rules-of-hooks
import { clearStorage } from "@core/storageService";

const http = axios.create({
  baseURL: BASE_URL,
});

const httpWithToken = axios.create({
  baseURL: BASE_URL,
});

httpWithToken.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        "x-access-token": `${token}`,
        userid: getUser()._id,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpWithToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      clearStorage();
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export { http, httpWithToken };
