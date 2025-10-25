/*
 * refactored to a singleton pattern
 * im sick of weird bugs about INVALID_URL, initialize once forever */
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { getToken, setToken } from "./tokenStore.js";

class ApiService {
  private static instance: ApiService;
  public api: AxiosInstance;
  private initialized = false;
  private times = 0;
  // Token refresh queue
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  private constructor() {
    this.api = axios.create();
    this.initialize();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private getApiBaseUrl(): string {
    // Next.js environment
    if (typeof process !== "undefined" && process.env) {
      if (process.env.NEXT_PUBLIC_API_BASE_URL) {
        return process.env.NEXT_PUBLIC_API_BASE_URL;
      }
    }

    // Vite environment
    if (typeof import.meta !== "undefined" && import.meta.env) {
      if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
      }
    }

    // Development defaults
    /*
    if (this.isDevelopment()) {
      console.warn('No API base URL found in environment variables, using default');
      return 'http://localhost:3000/api';
    }*/

    throw new Error(
      "API base URL is required. Set NEXT_PUBLIC_API_BASE_URL or VITE_API_BASE_URL",
    );
  }

  private isDevelopment(): boolean {
    // Next.js development
    if (typeof process !== "undefined" && process.env) {
      return process.env.NODE_ENV === "development";
    }

    // Vite development
    if (typeof import.meta !== "undefined" && import.meta.env) {
      return import.meta.env.DEV === true;
    }

    // Default to development if we can't determine
    return true;
  }

  private initialize() {
    if (this.initialized) return;

    const apiUrl = this.getApiBaseUrl();
    this.setupApi(apiUrl);
    this.initialized = true;
    this.times += 1;
    console.log(
      `API initialized with base URL: ${apiUrl} initialized ${this.times} time`,
    );
  }

  private setupApi(baseURL: string) {
    this.api.defaults.baseURL = baseURL;
    this.api.defaults.withCredentials = true;
    this.api.defaults.headers.common["Accept"] = "application/json";

    this.setupInterceptors();
  }

  private processQueue(error: AxiosError | null, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  private setupInterceptors() {
    // --- REQUEST INTERCEPTOR ---
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Only try to get token if we're in a browser environment
        if (typeof window !== "undefined") {
          const token = getToken();
          if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    // --- RESPONSE INTERCEPTOR ---
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Only handle 401 errors for token refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
              }
              return this.api(originalRequest);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const { data } = await this.api.post<{ accessToken: string }>(
              "/auth/refresh",
            );
            const newAccessToken = data.accessToken;

            // Only set token if we're in a browser environment
            if (typeof window !== "undefined") {
              setToken(newAccessToken);
            }

            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] =
                `Bearer ${newAccessToken}`;
            }
            this.processQueue(null, newAccessToken);
            return this.api(originalRequest);
          } catch (refreshError) {
            // Only clear token if we're in a browser environment
            if (typeof window !== "undefined") {
              setToken(null);
            }
            this.processQueue(refreshError as AxiosError, null);
            console.error("Session has expired. Please log in again.");
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  // Public method to reinitialize with a different base URL (useful for testing)
  public reinitialize(baseURL: string) {
    this.initialized = false;
    this.setupApi(baseURL);
    this.initialized = true;
  }
}

// Create and export singleton instance
export const apiService = ApiService.getInstance();
export const api = apiService.api;

// Legacy export for backward compatibility
export const initializeApi = (baseURL: string) => {
  apiService.reinitialize(baseURL);
};
