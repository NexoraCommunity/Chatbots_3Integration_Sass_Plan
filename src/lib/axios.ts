import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.params || "");
  return config;
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = axios.get("/api-backend/auth/refresh", {
          withCredentials: true,
        }).then((res) => {
          isRefreshing = false;
          return res.data;
        }).catch((err) => {
          isRefreshing = false;
          refreshPromise = null;
          return Promise.reject(err);
        });
      }

      try {
        await refreshPromise;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default axiosInstance;
