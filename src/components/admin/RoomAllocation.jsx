import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

// Import components
import AllocationDashboard from "./roomAllocation/AllocationDashboard";
import AllocationFilters from "./roomAllocation/AllocationFilters";
import AllocationTable from "./roomAllocation/AllocationTable";
import AddAllocationModal from "./roomAllocation/AddAllocationModal";
import EndAllocationModal from "./roomAllocation/EndAllocationModal";
import MoveStudentModal from "./roomAllocation/MoveStudentModal";
import Spinner from "../common/Spinner";
import roomService from "../../services/admin/roomService";
import studentService from "../../services/admin/studentService";
import roomAllocationService from "../../services/admin/roomAllocationService";
import { useNavigate } from "react-router-dom";

const RoomAllocation = () => {
  const navigate = useNavigate();

  // State for allocations data
  const [allocations, setAllocations] = useState([]);
  const [filteredAllocations, setFilteredAllocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for rooms and students data (for dropdowns)
  const [rooms, setRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [unassignedStudents, setUnassignedStudents] = useState([]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [allocationsPerPage] = useState(10);

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);

  // State for selected allocation
  const [selectedAllocation, setSelectedAllocation] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    student_id: "",
    room_id: "",
    start_date: new Date(),
    end_date: null,
    status: "DANGKY",
  });

  // State for move student form
  const [moveFormData, setMoveFormData] = useState({
    new_room_id: "",
    reason: "",
  });

  // State for filters
  const [filters, setFilters] = useState({
    roomId: "",
    studentId: "",
    status: "",
    dateRange: [null, null],
  });

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: "start_date",
    direction: "descending",
  });

  // Fetch allocations, rooms, and students data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const roomsData = await roomService.getAllRooms();
        const studentsData = await studentService.getAllStudents();
        const allocationsData = await roomAllocationService.getAllAllocations();

        // Enrich allocations with room and student data
        const enrichedAllocations = allocationsData.map((allocation) => {
          const student = studentsData.find(
            (s) => s.id === allocation.student_id
          );
          const room = roomsData.find((r) => r.id === allocation.room_id);
          return {
            ...allocation,
            student,
            room,
          };
        });

        setRooms(roomsData);
        setStudents(studentsData);
        setAllocations(enrichedAllocations);
        setFilteredAllocations(enrichedAllocations);

        // Calculate available rooms and unassigned students
        updateAvailableResources(roomsData, studentsData, enrichedAllocations);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update available rooms and unassigned students
  const updateAvailableResources = (
    roomsData,
    studentsData,
    allocationsData
  ) => {
    // Find rooms with available space
    const availableRoomsData = roomsData.filter(
      (room) => room.current_occupancy < room.capacity
    );
    setAvailableRooms(availableRoomsData);

    // Find students without active allocations
    const assignedStudentIds = allocationsData
      .filter((allocation) => allocation.status !== "INACTIVE")
      .map((allocation) => allocation.student_id);

    const unassignedStudentsData = studentsData.filter(
      (student) =>
        !assignedStudentIds.includes(student.id) && student.status != "INACTIVE"
    );

    setUnassignedStudents(unassignedStudentsData);
  };

  // Apply filters, search and sort
  useEffect(() => {
    if (!Array.isArray(allocations)) {
      setFilteredAllocations([]);
      return;
    }

    let result = [...allocations];

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (allocation) =>
          allocation.student.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          allocation.student.id
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          allocation.room.room_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.roomId) {
      result = result.filter(
        (allocation) => allocation.room_id.toString() === filters.roomId
      );
    }

    if (filters.studentId) {
      result = result.filter(
        (allocation) => allocation.student_id === filters.studentId
      );
    }

    if (filters.status) {
      result = result.filter(
        (allocation) => allocation.status === filters.status
      );
    }

    if (filters.dateRange[0] && filters.dateRange[1]) {
      const startDate = new Date(filters.dateRange[0]);
      const endDate = new Date(filters.dateRange[1]);

      result = result.filter((allocation) => {
        const allocationStartDate = new Date(allocation.start_date);
        return (
          allocationStartDate >= startDate && allocationStartDate <= endDate
        );
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (sortConfig.key === "room") {
          return sortConfig.direction === "ascending"
            ? a.room.room_number.localeCompare(b.room.room_number)
            : b.room.room_number.localeCompare(a.room.room_number);
        }

        if (sortConfig.key === "student") {
          return sortConfig.direction === "ascending"
            ? a.student.fullName.localeCompare(b.student.fullName)
            : b.student.fullName.localeCompare(a.student.fullName);
        }

        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredAllocations(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allocations, searchTerm, filters, sortConfig]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle move form input changes
  const handleMoveInputChange = (e) => {
    const { name, value } = e.target;
    setMoveFormData({
      ...moveFormData,
      [name]: value,
    });
  };

  // Handle date changes
  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Handle date range filter
  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setFilters({
      ...filters,
      dateRange: [start, end],
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      roomId: "",
      studentId: "",
      status: "",
      dateRange: [null, null],
    });
    setSearchTerm("");
  };

  // Add new allocation
  const handleAddAllocation = async (e) => {
    e.preventDefault();

    try {
      // Validate if student is already assigned
      const isStudentAssigned = allocations.some(
        (allocation) =>
          allocation.student_id === formData.student_id &&
          allocation.status !== "INACTIVE"
      );

      if (isStudentAssigned) {
        toast.error("Sinh viên này đã được phân phòng");
        return;
      }

      // Validate if room has available space
      const selectedRoom = rooms.find(
        (room) => room.id.toString() === formData.room_id
      );

      if (
        !selectedRoom ||
        selectedRoom.current_occupancy >= selectedRoom.capacity
      ) {
        toast.error("Phòng này đã đầy");
        return;
      }

      // Format dates for API
      const formattedStartDate = formData.start_date
        .toISOString()
        .split("T")[0];
      const formattedEndDate = formData.end_date
        ? formData.end_date.toISOString().split("T")[0]
        : null;

      // Create allocation data object for API
      const allocationData = {
        student_id: formData.student_id,
        room_id: parseInt(formData.room_id),
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        status: formData.status || "DANGKY",
      };

      // Call API to create new allocation
      const response = await roomAllocationService.createAllocation(
        allocationData
      );

      // Lấy dữ liệu từ response
      const newAllocation = response;

      // Tìm thông tin sinh viên và phòng để làm phong phú dữ liệu
      const selectedStudent = students.find(
        (student) => student.id === formData.student_id
      );

      // Tạo đối tượng phân phòng mới có đầy đủ thông tin
      const enrichedAllocation = {
        ...newAllocation,
        student: selectedStudent,
        room: selectedRoom,
      };

      // Cập nhật state của allocations
      setAllocations((prevAllocations) => [
        ...prevAllocations,
        enrichedAllocation,
      ]);

      // Cập nhật số người ở trong phòng
      const updatedRooms = rooms.map((room) =>
        room.id.toString() === formData.room_id
          ? { ...room, current_occupancy: room.current_occupancy + 1 }
          : room
      );
      setRooms(updatedRooms);

      // Cập nhật danh sách phòng trống và sinh viên chưa được phân phòng
      updateAvailableResources(updatedRooms, students, [
        ...allocations,
        enrichedAllocation,
      ]);

      // Đóng modal và reset form
      setShowAddModal(false);
      resetFormData();
      toast.success("Phân phòng mới thành công");
    } catch (error) {
      console.error("Error adding allocation:", error);

      // Hiển thị thông báo lỗi phù hợp
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Lỗi: ${error.response.data.message}`);
      } else {
        toast.error("Không thể thêm phân phòng. Vui lòng thử lại sau.");
      }
    }
  };

  // End allocation (checkout student)
  const handleEndAllocation = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      // Chuẩn bị dữ liệu cập nhật
      const updateData = {
        status: "DAKETTHUC", // Cập nhật thành giá trị đúng
        end_date: today,
      };

      // Gọi API để cập nhật
      const response = await roomAllocationService.updateAllocation(
        selectedAllocation.id,
        updateData
      );

      if (response && response.data) {
        // Cập nhật state
        const updatedAllocations = allocations.map((allocation) =>
          allocation.id === selectedAllocation.id
            ? {
                ...allocation,
                ...response.data,
                student: allocation.student,
                room: allocation.room,
              }
            : allocation
        );

        setAllocations(updatedAllocations);

        // Cập nhật số lượng người trong phòng
        const updatedRooms = rooms.map((room) =>
          room.id === selectedAllocation.room_id
            ? { ...room, current_occupancy: room.current_occupancy - 1 }
            : room
        );
        setRooms(updatedRooms);

        // Cập nhật tài nguyên khả dụng
        updateAvailableResources(updatedRooms, students, updatedAllocations);

        setShowDeleteModal(false);
        toast.success("Trả phòng thành công");
      }
    } catch (error) {
      console.error("Error ending allocation:", error);
      toast.error("Không thể trả phòng. Vui lòng thử lại sau.");
    }
  };

  const handleMoveStudent = async (e) => {
    e.preventDefault();

    try {
      // Kiểm tra phòng mới có còn chỗ không
      const selectedRoom = rooms.find(
        (room) => room.id.toString() === moveFormData.new_room_id
      );

      if (
        !selectedRoom ||
        selectedRoom.current_occupancy >= selectedRoom.capacity
      ) {
        toast.error("Phòng đã đầy, không thể chuyển sinh viên");
        return;
      }

      const today = new Date().toISOString().split("T")[0];

      // Kết thúc phân phòng hiện tại
      const updateData = {
        status: "DAKETTHUC", // Cập nhật thành giá trị đúng
        end_date: today,
        reason: `Chuyển sang phòng ${selectedRoom.room_number}: ${moveFormData.reason}`,
      };

      const endResponse = await roomAllocationService.updateAllocation(
        selectedAllocation.id,
        updateData
      );

      if (endResponse && endResponse.data) {
        // Tạo phân phòng mới
        const newAllocationData = {
          student_id: selectedAllocation.student_id,
          room_id: parseInt(moveFormData.new_room_id),
          start_date: today,
          end_date: null,
          status: "DANGO", // Cập nhật thành giá trị đúng
          move_reason: moveFormData.reason,
        };

        const newResponse = await roomAllocationService.createAllocation(
          newAllocationData
        );

        if (newResponse && newResponse.data) {
          // Cập nhật state với phân phòng mới và cũ
          const updatedAllocations = allocations.map((allocation) =>
            allocation.id === selectedAllocation.id
              ? {
                  ...allocation,
                  ...endResponse.data,
                  student: allocation.student,
                  room: allocation.room,
                }
              : allocation
          );

          // Thêm phân phòng mới vào danh sách
          const enrichedNewAllocation = {
            ...newResponse.data,
            student: selectedAllocation.student,
            room: selectedRoom,
          };

          const finalAllocations = [
            ...updatedAllocations,
            enrichedNewAllocation,
          ];
          setAllocations(finalAllocations);

          // Cập nhật số lượng người trong phòng
          const updatedRooms = rooms.map((room) => {
            if (room.id === selectedAllocation.room_id) {
              return { ...room, current_occupancy: room.current_occupancy - 1 };
            }
            if (room.id.toString() === moveFormData.new_room_id) {
              return { ...room, current_occupancy: room.current_occupancy + 1 };
            }
            return room;
          });
          setRooms(updatedRooms);

          // Cập nhật tài nguyên khả dụng
          updateAvailableResources(updatedRooms, students, finalAllocations);

          setShowMoveModal(false);
          resetMoveFormData();
          toast.success("Chuyển phòng thành công");
        }
      }
    } catch (error) {
      console.error("Error moving student:", error);
      toast.error("Không thể chuyển phòng. Vui lòng thử lại sau.");
    }
  };

  // Open checkout modal
  const openDeleteModal = (allocation) => {
    setSelectedAllocation(allocation);
    setShowDeleteModal(true);
  };

  // Open move modal
  const openMoveModal = (allocation) => {
    setSelectedAllocation(allocation);
    resetMoveFormData();
    setShowMoveModal(true);
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      student_id: "",
      room_id: "",
      start_date: new Date(),
      end_date: null,
      status: "DANGKY",
      updated_by: null,
    });
  };

  // Reset move form data
  const resetMoveFormData = () => {
    setMoveFormData({
      new_room_id: "",
      reason: "",
    });
  };

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  // Get current allocations for pagination
  const indexOfLastAllocation = currentPage * allocationsPerPage;
  const indexOfFirstAllocation = indexOfLastAllocation - allocationsPerPage;
  const currentAllocations = filteredAllocations.slice(
    indexOfFirstAllocation,
    indexOfLastAllocation
  );

  // Pagination change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Quản lý phân phòng
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          // disabled={
          //   unassignedStudents.length === 0 || availableRooms.length === 0
          // }
        >
          <FaPlus className="mr-2" />
          Phân phòng mới
        </button>
      </div>

      {/* Dashboard Cards */}
      <AllocationDashboard
        totalAllocations={allocations.length}
        activeAllocations={
          allocations.filter((a) => a.status === "DANGO").length
        }
        availableRooms={availableRooms.length}
        unassignedStudents={unassignedStudents.length}
      />

      {/* Filters and Search */}
      <AllocationFilters
        rooms={rooms}
        filters={filters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleFilterChange={handleFilterChange}
        handleDateRangeChange={handleDateRangeChange}
        resetFilters={resetFilters}
      />

      {/* Allocations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <AllocationTable
              allocations={currentAllocations}
              sortConfig={sortConfig}
              requestSort={requestSort}
              openMoveModal={openMoveModal}
              openDeleteModal={openDeleteModal}
              formatDate={formatDate}
            />

            {/* Pagination */}
            {filteredAllocations.length > allocationsPerPage && (
              <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị{" "}
                    <span className="font-medium">
                      {indexOfFirstAllocation + 1}
                    </span>{" "}
                    đến{" "}
                    <span className="font-medium">
                      {Math.min(
                        indexOfLastAllocation,
                        filteredAllocations.length
                      )}
                    </span>{" "}
                    trong tổng số{" "}
                    <span className="font-medium">
                      {filteredAllocations.length}
                    </span>{" "}
                    phân phòng
                  </p>
                </div>
                <div>
                  <nav className="flex space-x-2" aria-label="Pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Trước
                    </button>
                    {Array.from({
                      length: Math.ceil(
                        filteredAllocations.length / allocationsPerPage
                      ),
                    }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(
                          filteredAllocations.length / allocationsPerPage
                        )
                      }
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        currentPage ===
                        Math.ceil(
                          filteredAllocations.length / allocationsPerPage
                        )
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Tiếp
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddAllocationModal
          formData={formData}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          handleAddAllocation={handleAddAllocation}
          unassignedStudents={unassignedStudents}
          availableRooms={availableRooms}
          onClose={() => {
            setShowAddModal(false);
            resetFormData();
          }}
        />
      )}

      {showDeleteModal && selectedAllocation && (
        <EndAllocationModal
          allocation={selectedAllocation}
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleEndAllocation}
        />
      )}

      {showMoveModal && selectedAllocation && (
        <MoveStudentModal
          allocation={selectedAllocation}
          availableRooms={availableRooms}
          formData={moveFormData}
          handleInputChange={handleMoveInputChange}
          onClose={() => setShowMoveModal(false)}
          onSubmit={handleMoveStudent}
        />
      )}
    </div>
  );
};

export default RoomAllocation;
