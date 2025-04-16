export const TOKEN_KEY =
  import.meta.env.VITE_AUTH_ACCESS_TOKEN_KEY || "accessToken";
export const REFRESH_TOKEN_KEY =
  import.meta.env.VITE_AUTH_REFRESH_TOKEN_KEY || "refreshToken";
export const USER_KEY = import.meta.env.VITE_USER_DATA_KEY || "user";
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const TIMEOUT = parseInt(import.meta.env.VITE_TIMEOUT) || 10000;

export const roomTypeLabels = {
  STANDARD: "Tiêu chuẩn",
  PREMIUM: "Cao cấp",
  DELUXE: "Đặc biệt",
  LARGE: "Phòng lớn",
  SMALL: "Phòng nhỏ",
};

export const roomStatusLabels = {
  AVAILABLE: "Còn trống",
  OCCUPIED: "Đã thuê",
  MAINTENANCE: "Đang bảo trì",
  RESERVED: "Đã đặt trước",
  CLOSED: "Đã đóng",
};
