import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaUserGraduate,
  FaBed,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaExchangeAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomAllocation = () => {
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
  const [showEditModal, setShowEditModal] = useState(false);
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
    status: "active",
    created_by: "admin", // This would come from auth context in a real app
    updated_by: null,
  });

  // State for move student form
  const [moveFormData, setMoveFormData] = useState({
    new_room_id: "",
    reason: "",
    updated_by: "admin", // This would come from auth context in a real app
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
        // In a real app, you would fetch this data from your API
        // Example:
        // const allocationsResponse = await api.get('/allocations');
        // const roomsResponse = await api.get('/rooms');
        // const studentsResponse = await api.get('/students');

        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock rooms data
        const mockRooms = [
          {
            id: 1,
            room_number: "A101",
            building: "A",
            floor: 1,
            capacity: 4,
            current_occupancy: 3,
            status: "active",
          },
          {
            id: 2,
            room_number: "A102",
            building: "A",
            floor: 1,
            capacity: 2,
            current_occupancy: 2,
            status: "active",
          },
          {
            id: 3,
            room_number: "B201",
            building: "B",
            floor: 2,
            capacity: 4,
            current_occupancy: 2,
            status: "active",
          },
          {
            id: 4,
            room_number: "C301",
            building: "C",
            floor: 3,
            capacity: 2,
            current_occupancy: 1,
            status: "active",
          },
          {
            id: 5,
            room_number: "D401",
            building: "D",
            floor: 4,
            capacity: 4,
            current_occupancy: 4,
            status: "active",
          },
        ];

        // Mock students data
        const mockStudents = [
          {
            id: "SV001",
            fullName: "Nguyễn Văn An",
            gender: "Nam",
            major: "CNTT",
            year: "Năm 3",
            status: "active",
          },
          {
            id: "SV002",
            fullName: "Trần Thị Bình",
            gender: "Nữ",
            major: "Kinh tế",
            year: "Năm 2",
            status: "active",
          },
          {
            id: "SV003",
            fullName: "Lê Văn Cường",
            gender: "Nam",
            major: "Kỹ thuật",
            year: "Năm 4",
            status: "active",
          },
          {
            id: "SV004",
            fullName: "Phạm Thị Dung",
            gender: "Nữ",
            major: "Marketing",
            year: "Năm 1",
            status: "active",
          },
          {
            id: "SV005",
            fullName: "Hoàng Văn Em",
            gender: "Nam",
            major: "CNTT",
            year: "Năm 2",
            status: "active",
          },
          {
            id: "SV006",
            fullName: "Nguyễn Thị Giang",
            gender: "Nữ",
            major: "Ngôn ngữ",
            year: "Năm 2",
            status: "active",
          },
          {
            id: "SV007",
            fullName: "Trần Văn Hùng",
            gender: "Nam",
            major: "Kinh tế",
            year: "Năm 3",
            status: "active",
          },
          {
            id: "SV008",
            fullName: "Lê Thị Hoa",
            gender: "Nữ",
            major: "CNTT",
            year: "Năm 1",
            status: "active",
          },
        ];

        // Mock allocations data
        const mockAllocations = [
          {
            id: 1,
            student_id: "SV001",
            room_id: 1,
            start_date: "2023-09-01",
            end_date: null,
            status: "active",
            created_by: "admin",
            updated_by: null,
            created_at: "2023-08-15T00:00:00.000Z",
            student: mockStudents.find((s) => s.id === "SV001"),
            room: mockRooms.find((r) => r.id === 1),
          },
          {
            id: 2,
            student_id: "SV002",
            room_id: 4,
            start_date: "2023-09-01",
            end_date: null,
            status: "active",
            created_by: "admin",
            updated_by: null,
            created_at: "2023-08-16T00:00:00.000Z",
            student: mockStudents.find((s) => s.id === "SV002"),
            room: mockRooms.find((r) => r.id === 4),
          },
          {
            id: 3,
            student_id: "SV003",
            room_id: 3,
            start_date: "2023-09-01",
            end_date: null,
            status: "active",
            created_by: "admin",
            updated_by: null,
            created_at: "2023-08-17T00:00:00.000Z",
            student: mockStudents.find((s) => s.id === "SV003"),
            room: mockRooms.find((r) => r.id === 3),
          },
          {
            id: 4,
            student_id: "SV004",
            room_id: 3,
            start_date: "2023-09-01",
            end_date: null,
            status: "active",
            created_by: "admin",
            updated_by: null,
            created_at: "2023-08-18T00:00:00.000Z",
            student: mockStudents.find((s) => s.id === "SV004"),
            room: mockRooms.find((r) => r.id === 3),
          },
          {
            id: 5,
            student_id: "SV005",
            room_id: 1,
            start_date: "2023-09-01",
            end_date: null,
            status: "active",
            created_by: "admin",
            updated_by: null,
            created_at: "2023-08-19T00:00:00.000Z",
            student: mockStudents.find((s) => s.id === "SV005"),
            room: mockRooms.find((r) => r.id === 1),
          },
          {
            id: 6,
            student_id: "SV006",
            room_id: 1,
            start_date: "2023-09-01",
            end_date: null,
            status: "active",
            created_by: "admin",
            updated_by: null,
            created_at: "2023-08-20T00:00:00.000Z",
            student: mockStudents.find((s) => s.id === "SV006"),
            room: mockRooms.find((r) => r.id === 1),
          },
          {
            id: 7,
            student_id: "SV007",
            room_id: 5,
            start_date: "2023-09-01",
            end_date: "2023-12-31",
            status: "completed",
            created_by: "admin",
            updated_by: "admin",
            created_at: "2023-08-21T00:00:00.000Z",
            student: mockStudents.find((s) => s.id === "SV007"),
            room: mockRooms.find((r) => r.id === 5),
          },
        ];

        setRooms(mockRooms);
        setStudents(mockStudents);
        setAllocations(mockAllocations);
        setFilteredAllocations(mockAllocations);

        // Calculate available rooms and unassigned students
        updateAvailableResources(mockRooms, mockStudents, mockAllocations);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load allocation data");
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
      .filter((allocation) => allocation.status === "active")
      .map((allocation) => allocation.student_id);

    const unassignedStudentsData = studentsData.filter(
      (student) =>
        !assignedStudentIds.includes(student.id) && student.status === "active"
    );

    setUnassignedStudents(unassignedStudentsData);
  };

  // Apply filters, search and sort
  useEffect(() => {
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
      // In a real app, you would send this data to your API
      // Example: await api.post('/allocations', formData);

      // Validate if student is already assigned
      const isStudentAssigned = allocations.some(
        (allocation) =>
          allocation.student_id === formData.student_id &&
          allocation.status === "active"
      );

      if (isStudentAssigned) {
        toast.error("This student is already assigned to a room");
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
        toast.error("This room is already at full capacity");
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate a new ID (in a real app, the server would do this)
      const newId =
        Math.max(...allocations.map((allocation) => allocation.id)) + 1;

      // Format dates for storage
      const formattedStartDate = formData.start_date
        .toISOString()
        .split("T")[0];
      const formattedEndDate = formData.end_date
        ? formData.end_date.toISOString().split("T")[0]
        : null;

      const selectedStudent = students.find(
        (student) => student.id === formData.student_id
      );

      const newAllocation = {
        id: newId,
        student_id: formData.student_id,
        room_id: parseInt(formData.room_id),
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        status: formData.status,
        created_by: formData.created_by,
        updated_by: null,
        created_at: new Date().toISOString(),
        student: selectedStudent,
        room: selectedRoom,
      };

      // Update allocations state
      const updatedAllocations = [...allocations, newAllocation];
      setAllocations(updatedAllocations);

      // Update room occupancy
      const updatedRooms = rooms.map((room) =>
        room.id.toString() === formData.room_id
          ? { ...room, current_occupancy: room.current_occupancy + 1 }
          : room
      );
      setRooms(updatedRooms);

      // Update available resources
      updateAvailableResources(updatedRooms, students, updatedAllocations);

      setShowAddModal(false);
      resetFormData();
      toast.success("Room allocation added successfully");
    } catch (error) {
      console.error("Error adding allocation:", error);
      toast.error("Failed to add room allocation");
    }
  };

  // End allocation (checkout student)
  const handleEndAllocation = async () => {
    try {
      // In a real app, you would send this request to your API
      // Example: await api.put(`/allocations/${selectedAllocation.id}`, { status: 'completed', end_date: new Date() });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const today = new Date().toISOString().split("T")[0];

      // Update allocations state
      const updatedAllocations = allocations.map((allocation) =>
        allocation.id === selectedAllocation.id
          ? {
              ...allocation,
              status: "completed",
              end_date: today,
              updated_by: "admin",
            }
          : allocation
      );

      setAllocations(updatedAllocations);

      // Update room occupancy
      const updatedRooms = rooms.map((room) =>
        room.id === selectedAllocation.room_id
          ? { ...room, current_occupancy: room.current_occupancy - 1 }
          : room
      );
      setRooms(updatedRooms);

      // Update available resources
      updateAvailableResources(updatedRooms, students, updatedAllocations);

      setShowDeleteModal(false);
      toast.success("Student has been checked out successfully");
    } catch (error) {
      console.error("Error ending allocation:", error);
      toast.error("Failed to check out student");
    }
  };

  // Move student to another room
  const handleMoveStudent = async (e) => {
    e.preventDefault();

    try {
      // In a real app, you would send these requests to your API
      // Example:
      // await api.put(`/allocations/${selectedAllocation.id}`, { status: 'completed', end_date: new Date() });
      // await api.post('/allocations', newAllocationData);

      // Validate if new room has available space
      const selectedRoom = rooms.find(
        (room) => room.id.toString() === moveFormData.new_room_id
      );

      if (
        !selectedRoom ||
        selectedRoom.current_occupancy >= selectedRoom.capacity
      ) {
        toast.error("The destination room is already at full capacity");
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const today = new Date().toISOString().split("T")[0];

      // End current allocation
      const updatedAllocations = allocations.map((allocation) =>
        allocation.id === selectedAllocation.id
          ? {
              ...allocation,
              status: "completed",
              end_date: today,
              updated_by: "admin",
            }
          : allocation
      );

      // Create new allocation
      const newId =
        Math.max(...allocations.map((allocation) => allocation.id)) + 1;

      const newAllocation = {
        id: newId,
        student_id: selectedAllocation.student_id,
        room_id: parseInt(moveFormData.new_room_id),
        start_date: today,
        end_date: null,
        status: "active",
        created_by: "admin",
        updated_by: null,
        created_at: new Date().toISOString(),
        student: selectedAllocation.student,
        room: selectedRoom,
      };

      const finalAllocations = [...updatedAllocations, newAllocation];
      setAllocations(finalAllocations);

      // Update room occupancy for both rooms
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

      // Update available resources
      updateAvailableResources(updatedRooms, students, finalAllocations);

      setShowMoveModal(false);
      resetMoveFormData();
      toast.success("Student has been moved to a new room successfully");
    } catch (error) {
      console.error("Error moving student:", error);
      toast.error("Failed to move student to new room");
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
      status: "active",
      created_by: "admin",
      updated_by: null,
    });
  };

  // Reset move form data
  const resetMoveFormData = () => {
    setMoveFormData({
      new_room_id: "",
      reason: "",
      updated_by: "admin",
    });
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            Đang ở
          </span>
        );
      case "completed":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
            Đã kết thúc
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
            Đã hủy
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Get current allocations for pagination
  const indexOfLastAllocation = currentPage * allocationsPerPage;
  const indexOfFirstAllocation = indexOfLastAllocation - allocationsPerPage;
  const currentAllocations = filteredAllocations.slice(
    indexOfFirstAllocation,
    indexOfLastAllocation
  );

  // Change page
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
          disabled={
            unassignedStudents.length === 0 || availableRooms.length === 0
          }
        >
          <FaPlus className="mr-2" />
          Phân phòng mới
        </button>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Tổng số phân phòng</p>
              <p className="text-2xl font-bold">{allocations.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <FaBed className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Sinh viên đang ở</p>
              <p className="text-2xl font-bold">
                {allocations.filter((a) => a.status === "active").length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-800">
              <FaUserGraduate className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Phòng trống còn chỗ</p>
              <p className="text-2xl font-bold">{availableRooms.length}</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
              <FaBed className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Sinh viên chưa phân phòng</p>
              <p className="text-2xl font-bold">{unassignedStudents.length}</p>
            </div>
            <div className="p-3 rounded-full bg-red-100 text-red-800">
              <FaUserGraduate className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800 flex items-center">
            <FaFilter className="mr-2" />
            Lọc và tìm kiếm
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm theo sinh viên, phòng..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* Room filter */}
            <div>
              <select
                name="roomId"
                value={filters.roomId}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tất cả phòng</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.room_number} (Tòa {room.building})
                  </option>
                ))}
              </select>
            </div>

            {/* Status filter */}
            <div>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Đang ở</option>
                <option value="completed">Đã kết thúc</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>

            {/* Date Range Picker */}
            <div>
              <DatePicker
                selectsRange={true}
                startDate={filters.dateRange[0]}
                endDate={filters.dateRange[1]}
                onChange={handleDateRangeChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholderText="Chọn khoảng thời gian"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={resetFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Allocations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("student")}
                    >
                      <div className="flex items-center">
                        Sinh viên
                        {sortConfig.key === "student" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("room")}
                    >
                      <div className="flex items-center">
                        Phòng
                        {sortConfig.key === "room" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("start_date")}
                    >
                      <div className="flex items-center">
                        Ngày bắt đầu
                        {sortConfig.key === "start_date" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("end_date")}
                    >
                      <div className="flex items-center">
                        Ngày kết thúc
                        {sortConfig.key === "end_date" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("status")}
                    >
                      <div className="flex items-center">
                        Trạng thái
                        {sortConfig.key === "status" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("created_at")}
                    >
                      <div className="flex items-center">
                        Ngày tạo
                        {sortConfig.key === "created_at" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentAllocations.length > 0 ? (
                    currentAllocations.map((allocation) => (
                      <tr key={allocation.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                              <FaUserGraduate className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {allocation.student.fullName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {allocation.student.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {allocation.room.room_number}
                          </div>
                          <div className="text-sm text-gray-500">
                            Tòa {allocation.room.building}, Tầng{" "}
                            {allocation.room.floor}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(allocation.start_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(allocation.end_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(allocation.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(allocation.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {allocation.status === "active" && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openMoveModal(allocation)}
                                className="text-indigo-600 hover:text-indigo-900"
                                title="Chuyển phòng"
                              >
                                <FaExchangeAlt className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => openDeleteModal(allocation)}
                                className="text-red-600 hover:text-red-900"
                                title="Trả phòng"
                              >
                                <FaTrash className="h-5 w-5" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        Không tìm thấy phân phòng nào phù hợp với điều kiện tìm
                        kiếm
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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

      {/* Add Allocation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddAllocation}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Phân phòng mới
                  </h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sinh viên
                    </label>
                    <select
                      name="student_id"
                      value={formData.student_id}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Chọn sinh viên</option>
                      {unassignedStudents.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.fullName} ({student.id}) - {student.major}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phòng
                    </label>
                    <select
                      name="room_id"
                      value={formData.room_id}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Chọn phòng</option>
                      {availableRooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.room_number} (Tòa {room.building}) -{" "}
                          {room.current_occupancy}/{room.capacity} người
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày bắt đầu
                    </label>
                    <DatePicker
                      selected={formData.start_date}
                      onChange={(date) => handleDateChange(date, "start_date")}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      dateFormat="dd/MM/yyyy"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày kết thúc (không bắt buộc)
                    </label>
                    <DatePicker
                      selected={formData.end_date}
                      onChange={(date) => handleDateChange(date, "end_date")}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      dateFormat="dd/MM/yyyy"
                      minDate={formData.start_date}
                      isClearable
                      placeholderText="Chọn ngày kết thúc (nếu có)"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Phân phòng
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetFormData();
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* End Allocation (Checkout) Modal */}
      {showDeleteModal && selectedAllocation && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      Trả phòng
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bạn có chắc chắn muốn kết thúc phân phòng của sinh viên{" "}
                        <span className="font-medium">
                          {selectedAllocation.student.fullName}
                        </span>{" "}
                        tại phòng{" "}
                        <span className="font-medium">
                          {selectedAllocation.room.room_number}
                        </span>
                        ? Hành động này không thể hoàn tác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleEndAllocation}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Trả phòng
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Move Student Modal */}
      {showMoveModal && selectedAllocation && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleMoveStudent}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Chuyển phòng cho sinh viên
                  </h3>

                  <div className="mb-4">
                    <div className="bg-gray-50 p-3 rounded-md mb-4">
                      <p className="text-sm text-gray-600">
                        Sinh viên:{" "}
                        <span className="font-medium">
                          {selectedAllocation.student.fullName}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Phòng hiện tại:{" "}
                        <span className="font-medium">
                          {selectedAllocation.room.room_number} (Tòa{" "}
                          {selectedAllocation.room.building})
                        </span>
                      </p>
                    </div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phòng mới
                    </label>
                    <select
                      name="new_room_id"
                      value={moveFormData.new_room_id}
                      onChange={handleMoveInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Chọn phòng mới</option>
                      {availableRooms
                        .filter(
                          (room) => room.id !== selectedAllocation.room_id
                        )
                        .map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.room_number} (Tòa {room.building}) -{" "}
                            {room.current_occupancy}/{room.capacity} người
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lý do chuyển phòng
                    </label>
                    <textarea
                      name="reason"
                      value={moveFormData.reason}
                      onChange={handleMoveInputChange}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Nhập lý do chuyển phòng"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Chuyển phòng
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMoveModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomAllocation;
