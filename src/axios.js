import axios from "axios";
import {
  API_URL,
  REFRESH_TOKEN_KEY,
  TIMEOUT,
  TOKEN_KEY,
  USER_KEY,
} from "./constant/constants";

// Create an axios instance with default configuration using env variables
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: TIMEOUT,
});

// Request: Add accessToken into request headers
axiosClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response: auto refresh + handle error
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { response, config } = error;

    if (response?.status === 401 && !config._retry) {
      config._retry = true;
      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        const res = await axios.post(
          `${axiosClient.defaults.baseURL}/auth/refresh`,
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem(TOKEN_KEY, newAccessToken);

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(config);
      } catch (refreshError) {
        // Refresh token hết hạn hoặc sai
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (!response) {
      return Promise.reject({
        message:
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.",
      });
    }

    return Promise.reject({
      status: response.status,
      message: response.data.message || "Đã xảy ra lỗi",
      data: response.data,
    });
  }
);

export default axiosClient;
