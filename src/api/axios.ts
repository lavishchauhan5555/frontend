import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setAccessToken } from '../context/tokenStorage'

const api = axios.create({
  baseURL: 'http://localhost:3000/Auth',
  withCredentials: true, // needed for HttpOnly cookie (refresh token)
});

// Attach access token to every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Response interceptor for 401 handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        // Queue the request until refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: unknown) => {
              if (typeof token === 'string') {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post('/auth/refresh');
        const newAccessToken = (res.data as any).accessToken;

        setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        // Optionally redirect to login here
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
