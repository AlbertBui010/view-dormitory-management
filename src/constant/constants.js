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
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
  OVERDUE: "Quá hạn",
  CANCELLED: "Đã hủy",
};

// Rooms Allocation
export const roomAllocationStatus = {
  DANGKY: "Đăng ký",
  DANGO: "Đang ở",
  DAKETTHUC: "Đã kết thúc",
  DAHUY: "Đã hủy",
};

export const roomAllocationStatusClasses = {
  DANGKY: "bg-yellow-100 text-yellow-800",
  DANGO: "bg-green-100 text-green-800",
  DAKETTHUC: "bg-blue-100 text-blue-800",
  DAHUY: "bg-red-100 text-red-800",
};

export const getStatusText = (statusCode) => {
  return roomAllocationStatus[statusCode] || statusCode;
};

export const getStatusClass = (statusCode) => {
  return roomAllocationStatusClasses[statusCode] || "bg-gray-100 text-gray-800";
};
