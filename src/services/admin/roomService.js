import axiosClient from "../../axios";

const ROOM_BASE_URL = "/rooms";

const roomService = {
  getAllRooms: async () => {
    try {
      const response = await axiosClient.get(ROOM_BASE_URL);
      console.log("Rooom", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error);

      // Nếu là lỗi token expired, return object với status và message
      if (error.response && error.response.status === 401) {
        return {
          status: 401,
          message: "Token has expired.",
        };
      }

      throw error;
    }
  },

  getRoomById: async (id) => {
    try {
      const response = await axiosClient.get(`${ROOM_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching room details:", error);
      throw error;
    }
  },

  // Thêm hàm mới để lấy phòng theo ký túc xá
  getRoomsByDormitory: async (dormitoryId) => {
    try {
      const response = await axiosClient.get(
        `${ROOM_BASE_URL}/dormitory/${dormitoryId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching rooms for dormitory ${dormitoryId}:`,
        error
      );

      if (error.response && error.response.status === 401) {
        return {
          status: 401,
          message: "Token has expired.",
        };
      }

      throw error;
    }
  },

  createRoom: async (roomData) => {
    try {
      const response = await axiosClient.post(ROOM_BASE_URL, roomData);
      return response.data;
    } catch (error) {
      console.error("Error creating room:", error);

      // Xử lý lỗi cụ thể từ API
      if (error.response) {
        if (error.response.status === 401) {
          return {
            status: 401,
            message: "Token has expired or insufficient permissions.",
          };
        } else if (error.response.status === 403) {
          return {
            status: 403,
            message: "You don't have permission to create rooms.",
          };
        } else if (error.response.data && error.response.data.message) {
          // Trả về thông báo lỗi từ API
          return {
            status: error.response.status,
            message: error.response.data.message,
          };
        }
      }

      throw error;
    }
  },

  updateRoom: async (id, roomData) => {
    try {
      const response = await axiosClient.put(
        `${ROOM_BASE_URL}/${id}`,
        roomData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating room:", error);

      // Xử lý lỗi cụ thể từ API
      if (error.response) {
        if (error.response.status === 401) {
          return {
            status: 401,
            message: "Token has expired or insufficient permissions.",
          };
        } else if (error.response.status === 403) {
          return {
            status: 403,
            message: "You don't have permission to update rooms.",
          };
        } else if (error.response.status === 404) {
          return {
            status: 404,
            message: "Room not found.",
          };
        } else if (error.response.data && error.response.data.message) {
          // Trả về thông báo lỗi từ API
          return {
            status: error.response.status,
            message: error.response.data.message,
          };
        }
      }

      throw error;
    }
  },

  deleteRoom: async (id) => {
    try {
      const response = await axiosClient.delete(`${ROOM_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting room:", error);

      // Xử lý lỗi cụ thể từ API
      if (error.response) {
        if (error.response.status === 401) {
          return {
            status: 401,
            message: "Token has expired or insufficient permissions.",
          };
        } else if (error.response.status === 403) {
          return {
            status: 403,
            message: "You don't have permission to delete rooms.",
          };
        } else if (error.response.status === 404) {
          return {
            status: 404,
            message: "Room not found.",
          };
        } else if (error.response.data && error.response.data.message) {
          // Trả về thông báo lỗi từ API
          return {
            status: error.response.status,
            message: error.response.data.message,
          };
        }
      }

      throw error;
    }
  },
};

export default roomService;
