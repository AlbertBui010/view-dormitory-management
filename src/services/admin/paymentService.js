import axiosClient from "../../axios";

const BASE_URL = "/payments";

const paymentService = {
  /**
   * Lấy tất cả các khoản thanh toán
   * @returns {Promise<Array>} Danh sách khoản thanh toán với thông tin phân phòng, sinh viên và phòng
   */
  getAllPayments: async () => {
    try {
      const response = await axiosClient.get(BASE_URL);
      return response;
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }
  },

  /**
   * Lấy thông tin khoản thanh toán theo ID
   * @param {number|string} id - ID của khoản thanh toán
   * @returns {Promise<Object>} Thông tin chi tiết khoản thanh toán
   */
  getPaymentById: async (id) => {
    try {
      const response = await axiosClient.get(`${BASE_URL}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching payment with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Tạo khoản thanh toán mới
   * @param {Object} paymentData - Dữ liệu khoản thanh toán mới
   * @param {number} paymentData.room_allocation_id - ID phân phòng
   * @param {number} paymentData.amount - Số tiền
   * @param {string} paymentData.payment_date - Ngày thanh toán
   * @param {string} paymentData.payment_status - Trạng thái thanh toán
   * @param {string} paymentData.payment_method - Phương thức thanh toán
   * @param {string} paymentData.created_by - Người tạo
   * @returns {Promise<Object>} Thông tin khoản thanh toán đã tạo
   */
  createPayment: async (paymentData) => {
    try {
      const response = await axiosClient.post(BASE_URL, paymentData);
      return response;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  },

  /**
   * Cập nhật thông tin khoản thanh toán
   * @param {number|string} id - ID của khoản thanh toán cần cập nhật
   * @param {Object} updateData - Dữ liệu cập nhật
   * @returns {Promise<Object>} Thông tin khoản thanh toán sau khi cập nhật
   */
  updatePayment: async (id, updateData) => {
    try {
      const response = await axiosClient.put(`${BASE_URL}/${id}`, updateData);
      return response;
    } catch (error) {
      console.error(`Error updating payment with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Xóa khoản thanh toán
   * @param {number|string} id - ID của khoản thanh toán cần xóa
   * @returns {Promise<Object>} Kết quả xóa
   */
  deletePayment: async (id) => {
    try {
      const response = await axiosClient.delete(`${BASE_URL}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting payment with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Lấy danh sách khoản thanh toán của một sinh viên
   * @param {string|number} studentId - ID của sinh viên
   * @returns {Promise<Array>} Danh sách khoản thanh toán của sinh viên
   */
  getPaymentsByStudent: async (studentId) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/student/${studentId}`
      );
      return response;
    } catch (error) {
      console.error(`Error fetching payments for student ${studentId}:`, error);
      throw error;
    }
  },

  /**
   * Lấy khoản thanh toán theo ID phân phòng
   * @param {string|number} roomAllocationId - ID của phân phòng
   * @returns {Promise<Object>} Thông tin khoản thanh toán
   */
  getPaymentByRoomAllocation: async (roomAllocationId) => {
    try {
      const response = await axiosClient.get(
        `${BASE_URL}/room-allocation/${roomAllocationId}`
      );
      return response;
    } catch (error) {
      console.error(
        `Error fetching payment for room allocation ${roomAllocationId}:`,
        error
      );
      throw error;
    }
  },
};

export default paymentService;
