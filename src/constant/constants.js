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

// Students
export const studentStatusLabels = {
  DANGHOC: "Đang học",
  DATOTNGHIEP: "Đã tốt nghiệp",
  DINHCHI: "Đình chỉ",
  TAMNGHI: "Tạm nghỉ",
};

export const studentYearLabels = {
  NAM1: "Năm 1",
  NAM2: "Năm 2",
  NAM3: "Năm 3",
  NAM4: "Năm 4",
  NAM5: "Năm 5",
  NAM6: "Năm 6",
};

export const studentMajorsLabels = {
  CONGNGHETHONGTIN: "Công nghệ thông tin",
  QUANTRIKINHDOANH: "Quản trị kinh doanh",
  KYTHUATDIENTU: "Kỹ thuật điện tử",
  MARKETING: "Marketing",
  CONGNGHESINHHOC: "Công nghệ sinh học",
  KINHTEHOC: "Kinh tế học",
};

// Payments
export const paymentMethodLabels = {
  CASH: "Tiền mặt",
  BANK: "Chuyển khoản",
};

export const paymentStatusLabels = {
  PENDING: "Đang thanh toán",
  PAID: "Đã thanh toán",
  OVERDUE: "Quá hạn",
  CANCELLED: "Đã hủy",
};
