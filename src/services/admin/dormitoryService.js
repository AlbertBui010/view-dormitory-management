import axiosClient from "../../axios";

const DORMITORY_BASE_URL = "/dormitories";

const dormitoryService = {
  /**
   * Lấy danh sách tất cả ký túc xá
   * @returns {Promise<Array>} Danh sách ký túc xá
   */
  getAllDormitories: async () => {
    try {
      const response = await axiosClient.get(DORMITORY_BASE_URL);
      console.log("res:", response);
      return response;
    } catch (error) {
      console.error("Error fetching dormitories:", error);
      throw error;
    }
  },

  /**
   * Lấy thông tin chi tiết một ký túc xá theo ID
   * @param {number|string} id - ID của ký túc xá
   * @returns {Promise<Object>} Thông tin chi tiết ký túc xá
   */
  getDormitoryById: async (id) => {
    try {
      const response = await axiosClient.get(`${DORMITORY_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching dormitory with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Tạo mới một ký túc xá
   * @param {Object} dormitoryData - Dữ liệu ký túc xá cần tạo
   * @returns {Promise<Object>} Ký túc xá đã được tạo
   */
  createDormitory: async (dormitoryData) => {
    try {
      const response = await axiosClient.post(
        DORMITORY_BASE_URL,
        dormitoryData
      );
      return response;
    } catch (error) {
      console.error("Error creating dormitory:", error);
      throw error;
    }
  },

  /**
   * Cập nhật thông tin ký túc xá
   * @param {number|string} id - ID của ký túc xá
   * @param {Object} dormitoryData - Dữ liệu cập nhật
   * @returns {Promise<Object>} Ký túc xá đã được cập nhật
   */
  updateDormitory: async (id, dormitoryData) => {
    try {
      const response = await axiosClient.put(
        `${DORMITORY_BASE_URL}/${id}`,
        dormitoryData
      );
      return response;
    } catch (error) {
      console.error(`Error updating dormitory with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Xóa một ký túc xá
   * @param {number|string} id - ID của ký túc xá cần xóa
   * @returns {Promise<Object>} Kết quả của thao tác xóa
   */
  deleteDormitory: async (id) => {
    try {
      const response = await axiosClient.delete(`${DORMITORY_BASE_URL}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting dormitory with id ${id}:`, error);
      throw error;
    }
  },
};

export default dormitoryService;
