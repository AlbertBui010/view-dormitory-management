import axiosClient from "../../axios";

const BASE_URL = "/room-allocations";

const roomAllocationService = {
  /**
   * Get all room allocations
   * @returns {Promise<Array>} List of all room allocations
   */
  getAllAllocations: async () => {
    try {
      const response = await axiosClient.get(BASE_URL);
      return response;
    } catch (error) {
      console.error("Error fetching allocations:", error);
      throw error;
    }
  },

  /**
   * Get a single room allocation by ID
   * @param {string|number} id - The ID of the allocation to fetch
   * @returns {Promise<Object>} The allocation data
   */
  getAllocationById: async (id) => {
    try {
      const response = await axiosClient.get(`${BASE_URL}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching allocation with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new room allocation
   * @param {Object} allocationData - The data for the new allocation
   * @returns {Promise<Object>} The created allocation
   */
  createAllocation: async (allocationData) => {
    try {
      const response = await axiosClient.post(BASE_URL, allocationData);
      return response;
    } catch (error) {
      console.error("Error creating allocation:", error);
      throw error;
    }
  },

  /**
   * Update an existing room allocation
   * @param {string|number} id - The ID of the allocation to update
   * @param {Object} allocationData - The updated allocation data
   * @returns {Promise<Object>} The updated allocation
   */
  updateAllocation: async (id, allocationData) => {
    try {
      const response = await axiosClient.put(
        `${BASE_URL}/${id}`,
        allocationData
      );
      return response;
    } catch (error) {
      console.error(`Error updating allocation with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a room allocation
   * @param {string|number} id - The ID of the allocation to delete
   * @returns {Promise<Object>} Result of the deletion
   */
  deleteAllocation: async (id) => {
    try {
      const response = await axiosClient.delete(`${BASE_URL}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting allocation with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get allocations filtered by student ID
   * @param {string|number} studentId - The student ID to filter by
   * @returns {Promise<Array>} List of allocations for the student
   */
  getStudentAllocations: async (studentId) => {
    try {
      const allAllocations = await roomAllocationService.getAllAllocations();
      return allAllocations.filter(
        (allocation) => allocation.student_id === studentId
      );
    } catch (error) {
      console.error(
        `Error fetching allocations for student ${studentId}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Get allocations filtered by room ID
   * @param {string|number} roomId - The room ID to filter by
   * @returns {Promise<Array>} List of allocations for the room
   */
  getRoomAllocations: async (roomId) => {
    try {
      const allAllocations = await roomAllocationService.getAllAllocations();
      return allAllocations.filter(
        (allocation) => allocation.room_id === roomId
      );
    } catch (error) {
      console.error(`Error fetching allocations for room ${roomId}:`, error);
      throw error;
    }
  },

  /**
   * Get active allocations (where status is "active")
   * @returns {Promise<Array>} List of active allocations
   */
  getActiveAllocations: async () => {
    try {
      const allAllocations = await roomAllocationService.getAllAllocations();
      return allAllocations.filter(
        (allocation) => allocation.status === "active"
      );
    } catch (error) {
      console.error("Error fetching active allocations:", error);
      throw error;
    }
  },

  /**
   * End an allocation (update status to "completed" and set end_date)
   * @param {string|number} id - The ID of the allocation to end
   * @param {string} reason - Optional reason for ending the allocation
   * @returns {Promise<Object>} The updated allocation
   */
  endAllocation: async (id, reason = "") => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const updateData = {
        status: "completed",
        end_date: today,
        reason: reason,
        updated_by: "admin", // Assuming admin is performing this action
      };

      return await roomAllocationService.updateAllocation(id, updateData);
    } catch (error) {
      console.error(`Error ending allocation with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Move a student to a new room (end current allocation and create a new one)
   * @param {string|number} currentAllocationId - The ID of the current allocation
   * @param {string|number} newRoomId - The ID of the new room
   * @param {string} reason - Reason for the move
   * @returns {Promise<Object>} The new allocation
   */
  moveStudent: async (currentAllocationId, newRoomId, reason = "") => {
    try {
      // First, get the current allocation
      const currentAllocation = await roomAllocationService.getAllocationById(
        currentAllocationId
      );

      // End the current allocation
      await roomAllocationService.endAllocation(
        currentAllocationId,
        `Moved to room ID: ${newRoomId}. Reason: ${reason}`
      );

      // Create a new allocation
      const today = new Date().toISOString().split("T")[0];
      const newAllocationData = {
        student_id: currentAllocation.student_id,
        room_id: parseInt(newRoomId),
        start_date: today,
        status: "active",
        created_by: "admin",
        move_reason: reason,
      };

      return await roomAllocationService.createAllocation(newAllocationData);
    } catch (error) {
      console.error(
        `Error moving student from allocation ${currentAllocationId} to room ${newRoomId}:`,
        error
      );
      throw error;
    }
  },
};

export default roomAllocationService;
