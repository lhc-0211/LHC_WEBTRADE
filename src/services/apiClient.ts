import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Interceptor thêm token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý response
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Token expired → cần refresh token hoặc logout");
      // TODO: Refresh token
    }
    return Promise.reject(err);
  }
);

// Abort controller
export const createAbortSignal = () => {
  const controller = new AbortController();
  return { signal: controller.signal, cancel: () => controller.abort() };
};
