// Mock API service responses - add this to a mock file or as test data
// Thêm dữ liệu mẫu cho dormitories
const mockDormitories = [
  {
    id: 1,
    name: "KTX Khu A",
    address: "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    total_rooms: 100,
    created_by: "admin",
    created_at: "2023-01-15",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 2,
    name: "KTX Khu B",
    address: "Số 2 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    total_rooms: 150,
    created_by: "admin",
    created_at: "2023-02-10",
    updated_by: "admin",
    updated_at: "2023-03-15",
  },
  {
    id: 3,
    name: "KTX Khu C",
    address: "Số 3 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    total_rooms: 80,
    created_by: "admin",
    created_at: "2023-04-20",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 4,
    name: "KTX Khu D",
    address: "Số 4 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    total_rooms: 120,
    created_by: "admin",
    created_at: "2023-05-05",
    updated_by: "admin",
    updated_at: "2023-06-10",
  },
  {
    id: 5,
    name: "KTX Khu E",
    address: "Số 5 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    total_rooms: 90,
    created_by: "admin",
    created_at: "2023-07-12",
    updated_by: null,
    updated_at: null,
  },
];

// Mock Rooms Data
const mockRooms = [
  {
    id: "R001",
    room_number: "A101",
    building: "A",
    capacity: 4,
    available_beds: 1,
    monthly_fee: 800000,
  },
  {
    id: "R002",
    room_number: "A102",
    building: "A",
    capacity: 4,
    available_beds: 0,
    monthly_fee: 800000,
  },
  {
    id: "R003",
    room_number: "A201",
    building: "A",
    capacity: 4,
    available_beds: 2,
    monthly_fee: 750000,
  },
  {
    id: "R004",
    room_number: "B101",
    building: "B",
    capacity: 2,
    available_beds: 0,
    monthly_fee: 1000000,
  },
  {
    id: "R005",
    room_number: "B102",
    building: "B",
    capacity: 2,
    available_beds: 1,
    monthly_fee: 1000000,
  },
  {
    id: "R006",
    room_number: "C101",
    building: "C",
    capacity: 6,
    available_beds: 3,
    monthly_fee: 600000,
  },
  {
    id: "R007",
    room_number: "C102",
    building: "C",
    capacity: 6,
    available_beds: 1,
    monthly_fee: 600000,
  },
  {
    id: "R008",
    room_number: "A202",
    building: "A",
    capacity: 4,
    available_beds: 4,
    monthly_fee: 750000,
  },
  {
    id: "R009",
    room_number: "B201",
    building: "B",
    capacity: 2,
    available_beds: 0,
    monthly_fee: 1100000,
  },
  {
    id: "R010",
    room_number: "C201",
    building: "C",
    capacity: 6,
    available_beds: 2,
    monthly_fee: 650000,
  },
];

// Mock Students Data
const mockStudents = [
  {
    id: "SV001",
    fullName: "Nguyễn Văn An",
    gender: "male",
    birthday: "2002-05-15",
    phone: "0912345678",
    email: "an.nguyenvan@example.com",
    address: "Hà Nội",
    major: "Công nghệ thông tin",
  },
  {
    id: "SV002",
    fullName: "Trần Thị Bình",
    gender: "female",
    birthday: "2003-02-20",
    phone: "0923456789",
    email: "binh.tranthi@example.com",
    address: "Hải Phòng",
    major: "Kế toán",
  },
  {
    id: "SV003",
    fullName: "Phạm Văn Cường",
    gender: "male",
    birthday: "2001-11-10",
    phone: "0934567890",
    email: "cuong.phamvan@example.com",
    address: "Hồ Chí Minh",
    major: "Quản trị kinh doanh",
  },
  {
    id: "SV004",
    fullName: "Lê Thị Dung",
    gender: "female",
    birthday: "2002-07-25",
    phone: "0945678901",
    email: "dung.lethi@example.com",
    address: "Đà Nẵng",
    major: "Ngôn ngữ Anh",
  },
  {
    id: "SV005",
    fullName: "Hoàng Văn Hải",
    gender: "male",
    birthday: "2003-04-18",
    phone: "0956789012",
    email: "hai.hoangvan@example.com",
    address: "Hà Nội",
    major: "Công nghệ thông tin",
  },
  {
    id: "SV006",
    fullName: "Trần Thị Giáng",
    gender: "female",
    birthday: "2002-01-30",
    phone: "0967890123",
    email: "giang.tranthi@example.com",
    address: "Cần Thơ",
    major: "Tài chính ngân hàng",
  },
  {
    id: "SV007",
    fullName: "Đỗ Văn Hùng",
    gender: "male",
    birthday: "2001-09-05",
    phone: "0978901234",
    email: "hung.dovan@example.com",
    address: "Huế",
    major: "Kỹ thuật xây dựng",
  },
  {
    id: "SV008",
    fullName: "Nguyễn Thị Hương",
    gender: "female",
    birthday: "2002-12-12",
    phone: "0989012345",
    email: "huong.nguyenthi@example.com",
    address: "Hà Nội",
    major: "Marketing",
  },
  {
    id: "SV009",
    fullName: "Lý Văn Khang",
    gender: "male",
    birthday: "2003-08-22",
    phone: "0890123456",
    email: "khang.lyvan@example.com",
    address: "Hồ Chí Minh",
    major: "Công nghệ thông tin",
  },
  {
    id: "SV010",
    fullName: "Phạm Thị Lan",
    gender: "female",
    birthday: "2001-06-14",
    phone: "0901234567",
    email: "lan.phamthi@example.com",
    address: "Đà Nẵng",
    major: "Du lịch",
  },
];

// Mock Payments Data
const mockPayments = [
  {
    id: 1,
    student_id: "SV001",
    room_id: "R001",
    amount: 2400000,
    payment_date: "2023-09-01",
    payment_status: "paid",
    payment_method: "bank_transfer",
    notes: "Thanh toán tiền phòng học kỳ 1",
    created_by: "admin",
    created_at: "2023-08-28",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 2,
    student_id: "SV002",
    room_id: "R002",
    amount: 2400000,
    payment_date: "2023-09-02",
    payment_status: "paid",
    payment_method: "cash",
    notes: "Thanh toán tiền phòng học kỳ 1",
    created_by: "admin",
    created_at: "2023-09-02",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 3,
    student_id: "SV003",
    room_id: "R004",
    amount: 3000000,
    payment_date: "2023-09-03",
    payment_status: "paid",
    payment_method: "momo",
    notes: "Thanh toán tiền phòng học kỳ 1",
    created_by: "admin",
    created_at: "2023-09-03",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 4,
    student_id: "SV004",
    room_id: "R005",
    amount: 3000000,
    payment_date: "2023-09-15",
    payment_status: "pending",
    payment_method: "bank_transfer",
    notes: "Sinh viên hẹn chuyển khoản trước ngày 20/09",
    created_by: "admin",
    created_at: "2023-09-15",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 5,
    student_id: "SV005",
    room_id: "R003",
    amount: 2250000,
    payment_date: "2023-09-05",
    payment_status: "paid",
    payment_method: "cash",
    notes: "Thanh toán tiền phòng học kỳ 1",
    created_by: "admin",
    created_at: "2023-09-05",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 6,
    student_id: "SV006",
    room_id: "R006",
    amount: 1800000,
    payment_date: "2023-09-06",
    payment_status: "paid",
    payment_method: "bank_transfer",
    notes: "Thanh toán tiền phòng học kỳ 1",
    created_by: "admin",
    created_at: "2023-09-06",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 7,
    student_id: "SV007",
    room_id: "R007",
    amount: 1800000,
    payment_date: "2023-09-20",
    payment_status: "overdue",
    payment_method: "cash",
    notes: "Sinh viên chưa đóng tiền đúng hạn",
    created_by: "admin",
    created_at: "2023-09-07",
    updated_by: "admin",
    updated_at: "2023-09-20",
  },
  {
    id: 8,
    student_id: "SV008",
    room_id: "R009",
    amount: 3300000,
    payment_date: "2023-09-08",
    payment_status: "paid",
    payment_method: "momo",
    notes: "Thanh toán tiền phòng học kỳ 1",
    created_by: "admin",
    created_at: "2023-09-08",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 9,
    student_id: "SV009",
    room_id: "R001",
    amount: 2400000,
    payment_date: "2023-09-22",
    payment_status: "pending",
    payment_method: "bank_transfer",
    notes: "Sinh viên sẽ chuyển khoản vào cuối tháng",
    created_by: "admin",
    created_at: "2023-09-09",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 10,
    student_id: "SV010",
    room_id: "R010",
    amount: 1950000,
    payment_date: "2023-09-25",
    payment_status: "cancelled",
    payment_method: "cash",
    notes: "Sinh viên chuyển sang ở ngoài",
    created_by: "admin",
    created_at: "2023-09-10",
    updated_by: "admin",
    updated_at: "2023-09-25",
  },
  {
    id: 11,
    student_id: "SV001",
    room_id: "R001",
    amount: 2400000,
    payment_date: "2024-01-05",
    payment_status: "paid",
    payment_method: "bank_transfer",
    notes: "Thanh toán tiền phòng học kỳ 2",
    created_by: "admin",
    created_at: "2024-01-05",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 12,
    student_id: "SV002",
    room_id: "R002",
    amount: 2400000,
    payment_date: "2024-01-06",
    payment_status: "paid",
    payment_method: "cash",
    notes: "Thanh toán tiền phòng học kỳ 2",
    created_by: "admin",
    created_at: "2024-01-06",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 13,
    student_id: "SV003",
    room_id: "R004",
    amount: 3000000,
    payment_date: "2024-01-10",
    payment_status: "pending",
    payment_method: "momo",
    notes: "Sinh viên hẹn thanh toán trước ngày 15/01",
    created_by: "admin",
    created_at: "2024-01-10",
    updated_by: null,
    updated_at: null,
  },
  {
    id: 14,
    student_id: "SV005",
    room_id: "R003",
    amount: 2250000,
    payment_date: "2024-01-15",
    payment_status: "overdue",
    payment_method: "cash",
    notes: "Sinh viên chưa đóng tiền đúng hạn",
    created_by: "admin",
    created_at: "2024-01-05",
    updated_by: "admin",
    updated_at: "2024-01-15",
  },
  {
    id: 15,
    student_id: "SV008",
    room_id: "R009",
    amount: 3300000,
    payment_date: "2024-01-08",
    payment_status: "paid",
    payment_method: "bank_transfer",
    notes: "Thanh toán tiền phòng học kỳ 2",
    created_by: "admin",
    created_at: "2024-01-08",
    updated_by: null,
    updated_at: null,
  },
];

// Mock API response function
const mockApiService = {
  get: async (endpoint) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated delay

    switch (endpoint) {
      case "/dormitories":
        return { data: mockDormitories };
      case "/rooms":
        return { data: mockRooms };
      case "/students":
        return { data: mockStudents };
      case "/payments":
        return { data: mockPayments };
      default:
        throw new Error(`Endpoint not mocked: ${endpoint}`);
    }
  },

  post: async (endpoint, data) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated delay

    // Trong hàm post, thêm case mới
    if (endpoint === "/dormitories") {
      const newDormitory = {
        ...data,
        id: mockDormitories.length + 1,
        created_at: new Date().toISOString().split("T")[0],
        updated_at: null,
      };
      mockDormitories.push(newDormitory);
      return { data: newDormitory };
    }

    if (endpoint === "/payments") {
      const newPayment = {
        ...data,
        id: mockPayments.length + 1,
        created_at: new Date().toISOString().split("T")[0],
        updated_at: null,
      };
      return { data: newPayment };
    }

    throw new Error(`Endpoint not mocked: ${endpoint}`);
  },

  put: async (endpoint, data) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated delay

    if (endpoint.startsWith("/dormitories/")) {
      const id = parseInt(endpoint.split("/").pop());
      const index = mockDormitories.findIndex((d) => d.id === id);

      if (index !== -1) {
        const updatedDormitory = {
          ...mockDormitories[index],
          ...data,
          updated_at: new Date().toISOString().split("T")[0],
        };
        mockDormitories[index] = updatedDormitory;
        return { data: updatedDormitory };
      }
      throw new Error(`Dormitory with id ${id} not found`);
    }

    if (endpoint.startsWith("/payments/")) {
      const updatedPayment = {
        ...data,
        updated_at: new Date().toISOString().split("T")[0],
      };
      return { data: updatedPayment };
    }

    throw new Error(`Endpoint not mocked: ${endpoint}`);
  },

  delete: async (endpoint) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated delay

    if (endpoint.startsWith("/dormitories/")) {
      const id = parseInt(endpoint.split("/").pop());
      const index = mockDormitories.findIndex((d) => d.id === id);

      if (index !== -1) {
        mockDormitories.splice(index, 1);
        return { status: 200 };
      }
      throw new Error(`Dormitory with id ${id} not found`);
    }

    if (endpoint.startsWith("/payments/")) {
      return { status: 200 };
    }

    throw new Error(`Endpoint not mocked: ${endpoint}`);
  },
};

export default mockApiService;
