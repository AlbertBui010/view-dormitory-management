import axiosClient from "../../axios";

const STUDENT_API_URL = "/students";

/**
 * Lấy danh sách tất cả sinh viên
 * @returns {Promise} Danh sách sinh viên
 */
const getAllStudents = async () => {
  try {
    const response = await axiosClient.get(STUDENT_API_URL);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { status: 401, message: "Unauthorized" };
    }
    throw error;
  }
};

/**
 * Lấy thông tin sinh viên theo ID
 * @param {string} id ID của sinh viên
 * @returns {Promise} Thông tin sinh viên
 */
const getStudentById = async (id) => {
  try {
    const response = await axiosClient.get(`${STUDENT_API_URL}/${id}`);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { status: 401, message: "Unauthorized" };
    }
    throw error;
  }
};

/**
 * Tạo sinh viên mới
 * @param {Object} studentData Thông tin sinh viên cần tạo
 * @returns {Promise} Thông tin sinh viên sau khi tạo
 */
const createStudent = async (studentData) => {
  try {
    const response = await axiosClient.post(STUDENT_API_URL, studentData);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { status: 401, message: "Unauthorized" };
    }
    throw error;
  }
};

/**
 * Cập nhật thông tin sinh viên
 * @param {string} id ID của sinh viên
 * @param {Object} studentData Thông tin sinh viên cần cập nhật
 * @returns {Promise} Thông tin sinh viên sau khi cập nhật
 */
const updateStudent = async (id, studentData) => {
  try {
    const response = await axiosClient.put(
      `${STUDENT_API_URL}/${id}`,
      studentData
    );
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Xóa sinh viên
 * @param {string} id ID của sinh viên cần xóa
 * @returns {Promise} Kết quả xóa sinh viên
 */
const deleteStudent = async (id) => {
  try {
    const response = await axiosClient.delete(`${STUDENT_API_URL}/${id}`);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { status: 401, message: "Unauthorized" };
    }
    throw error;
  }
};

/**
 * Lấy danh sách sinh viên theo ký túc xá
 * @param {string} dormitoryId ID của ký túc xá
 * @returns {Promise} Danh sách sinh viên trong ký túc xá
 */
const getStudentsByDormitory = async (dormitoryId) => {
  try {
    const response = await axiosClient.get(
      `${STUDENT_API_URL}/dormitory/${dormitoryId}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { status: 401, message: "Unauthorized" };
    }
    throw error;
  }
};

/**
 * Lấy danh sách sinh viên theo phòng
 * @param {string} roomId ID của phòng
 * @returns {Promise} Danh sách sinh viên trong phòng
 */
const getStudentsByRoom = async (roomId) => {
  try {
    const response = await axiosClient.get(`${STUDENT_API_URL}/room/${roomId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return { status: 401, message: "Unauthorized" };
    }
    throw error;
  }
};

const studentService = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByDormitory,
  getStudentsByRoom,
};

export default studentService;
