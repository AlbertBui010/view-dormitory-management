import axiosClient from "../axios";
import {
  API_URL,
  REFRESH_TOKEN_KEY,
  TOKEN_KEY,
  USER_KEY,
} from "../constant/constants";

const authService = {
  login: async (email, password) => {
    const response = await axiosClient.post("/auth/login", { email, password });

    if (response?.data != []) {
      const data = response.data;
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }

    return response;
  },

  register: async (userData) => {
    return await axiosClient.post("/auth/register", userData);
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: async () => {
    return await axiosClient.get("/auth/profile");
  },

  saveAuth: (data) => {
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  },
};

export default authService;
