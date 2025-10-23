import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { getToken, setToken } from "./tokenStore.js";

export const api: AxiosInstance = axios.create();

type FailedQueueItem = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const initializeApi = (baseURL: string) => {
  api.defaults.baseURL = baseURL;
  api.defaults.withCredentials = true;

  // --- REQUEST INTERCEPTOR ---
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  // --- RESPONSE INTERCEPTOR ---
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            return axios(originalRequest);
          });
        }
        originalRequest._retry = true;
        isRefreshing = true;
        try {
          const { data } = await api.post<{ accessToken: string }>(
            "/auth/refresh",
          );
          const newAccessToken = data.accessToken;
          setToken(newAccessToken);
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;
          }
          processQueue(null, newAccessToken);
          return axios(originalRequest);
        } catch (refreshError) {
          setToken(null);
          processQueue(refreshError as AxiosError, null);
          console.error("Session has expired. Please log in again.");
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    },
  );
};
