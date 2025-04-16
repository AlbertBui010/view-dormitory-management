import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Rooms = () => {
  // State for rooms data
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(10);

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State for selected room
  const [selectedRoom, setSelectedRoom] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    room_number: "",
    building: "",
    floor: "",
    type: "",
    capacity: 0,
    price: 0,
    facilities: [],
    status: "available",
  });

  // State for filters
  const [filters, setFilters] = useState({
    building: "",
    type: "",
    status: "",
    priceRange: [0, 5000000],
    capacity: "",
  });

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: "room_number",
    direction: "ascending",
  });

  // Fetch rooms data
  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch this data from your API
        // Example: const response = await roomService.getAllRooms();

        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockRooms = [
          {
            id: 1,
            room_number: "A101",
            building: "A",
            floor: 1,
            type: "Standard",
            capacity: 4,
            price: 1200000,
            facilities: ["Wifi", "Air Conditioner", "Fridge"],
            status: "occupied",
            occupants: 4,
          },
          {
            id: 2,
            room_number: "A102",
            building: "A",
            floor: 1,
            type: "Premium",
            capacity: 2,
            price: 1800000,
            facilities: ["Wifi", "Air Conditioner", "Fridge", "TV"],
            status: "available",
            occupants: 0,
          },
          {
            id: 3,
            room_number: "B201",
            building: "B",
            floor: 2,
            type: "Standard",
            capacity: 4,
            price: 1200000,
            facilities: ["Wifi", "Air Conditioner"],
            status: "occupied",
            occupants: 3,
          },
          {
            id: 4,
            room_number: "B202",
            building: "B",
            floor: 2,
            type: "Premium",
            capacity: 2,
            price: 1800000,
            facilities: ["Wifi", "Air Conditioner", "Fridge", "TV"],
            status: "maintenance",
            occupants: 0,
          },
          {
            id: 5,
            room_number: "C301",
            building: "C",
            floor: 3,
            type: "Deluxe",
            capacity: 2,
            price: 2200000,
            facilities: [
              "Wifi",
              "Air Conditioner",
              "Fridge",
              "TV",
              "Private Bathroom",
            ],
            status: "available",
            occupants: 0,
          },
          {
            id: 6,
            room_number: "C302",
            building: "C",
            floor: 3,
            type: "Deluxe",
            capacity: 2,
            price: 2200000,
            facilities: [
              "Wifi",
              "Air Conditioner",
              "Fridge",
              "TV",
              "Private Bathroom",
            ],
            status: "occupied",
            occupants: 2,
          },
          {
            id: 7,
            room_number: "D401",
            building: "D",
            floor: 4,
            type: "Standard",
            capacity: 4,
            price: 1200000,
            facilities: ["Wifi", "Air Conditioner"],
            status: "occupied",
            occupants: 4,
          },
          {
            id: 8,
            room_number: "D402",
            building: "D",
            floor: 4,
            type: "Standard",
            capacity: 4,
            price: 1200000,
            facilities: ["Wifi", "Air Conditioner"],
            status: "available",
            occupants: 0,
          },
        ];

        setRooms(mockRooms);
        setFilteredRooms(mockRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Failed to load rooms data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Apply filters, search and sort
  useEffect(() => {
    let result = [...rooms];

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (room) =>
          room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.building) {
      result = result.filter((room) => room.building === filters.building);
    }

    if (filters.type) {
      result = result.filter((room) => room.type === filters.type);
    }

    if (filters.status) {
      result = result.filter((room) => room.status === filters.status);
    }

    if (filters.capacity) {
      result = result.filter(
        (room) => room.capacity === parseInt(filters.capacity)
      );
    }

    result = result.filter(
      (room) =>
        room.price >= filters.priceRange[0] &&
        room.price <= filters.priceRange[1]
    );

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredRooms(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [rooms, searchTerm, filters, sortConfig]);

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

  // Handle facilities checkboxes
  const handleFacilityChange = (facility) => {
    const updatedFacilities = [...formData.facilities];

    if (updatedFacilities.includes(facility)) {
      const index = updatedFacilities.indexOf(facility);
      updatedFacilities.splice(index, 1);
    } else {
      updatedFacilities.push(facility);
    }

    setFormData({
      ...formData,
      facilities: updatedFacilities,
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

  // Reset filters
  const resetFilters = () => {
    setFilters({
      building: "",
      type: "",
      status: "",
      priceRange: [0, 5000000],
      capacity: "",
    });
    setSearchTerm("");
  };

  // Add new room
  const handleAddRoom = async (e) => {
    e.preventDefault();

    try {
      // In a real app, you would send this data to your API
      // Example: await roomService.createRoom(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate a new ID (in a real app, the server would do this)
      const newId = Math.max(...rooms.map((room) => room.id)) + 1;

      const newRoom = {
        id: newId,
        ...formData,
        occupants: 0,
      };

      setRooms([...rooms, newRoom]);
      setShowAddModal(false);
      resetFormData();
      toast.success("Room added successfully");
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error("Failed to add room");
    }
  };

  // Update room
  const handleUpdateRoom = async (e) => {
    e.preventDefault();

    try {
      // In a real app, you would send this data to your API
      // Example: await roomService.updateRoom(selectedRoom.id, formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedRooms = rooms.map((room) =>
        room.id === selectedRoom.id ? { ...room, ...formData } : room
      );

      setRooms(updatedRooms);
      setShowEditModal(false);
      resetFormData();
      toast.success("Room updated successfully");
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Failed to update room");
    }
  };

  // Delete room
  const handleDeleteRoom = async () => {
    try {
      // In a real app, you would send this request to your API
      // Example: await roomService.deleteRoom(selectedRoom.id);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedRooms = rooms.filter((room) => room.id !== selectedRoom.id);

      setRooms(updatedRooms);
      setShowDeleteModal(false);
      toast.success("Room deleted successfully");
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room");
    }
  };

  // Open edit modal and populate form
  const openEditModal = (room) => {
    setSelectedRoom(room);
    setFormData({
      room_number: room.room_number,
      building: room.building,
      floor: room.floor,
      type: room.type,
      capacity: room.capacity,
      price: room.price,
      facilities: [...room.facilities],
      status: room.status,
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      room_number: "",
      building: "",
      floor: "",
      type: "",
      capacity: 0,
      price: 0,
      facilities: [],
      status: "available",
    });
  };

  // Get current rooms for pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "available":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            Trống
          </span>
        );
      case "occupied":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
            Đã thuê
          </span>
        );
      case "maintenance":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
            Bảo trì
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

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Quản lý phòng ở
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" />
          Thêm phòng mới
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800 flex items-center">
            <FaFilter className="mr-2" />
            Bộ lọc tìm kiếm
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm phòng..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* Building filter */}
            <div>
              <select
                name="building"
                value={filters.building}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tất cả tòa nhà</option>
                <option value="A">Tòa A</option>
                <option value="B">Tòa B</option>
                <option value="C">Tòa C</option>
                <option value="D">Tòa D</option>
              </select>
            </div>

            {/* Room type filter */}
            <div>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tất cả loại phòng</option>
                <option value="Standard">Tiêu chuẩn</option>
                <option value="Premium">Cao cấp</option>
                <option value="Deluxe">Đặc biệt</option>
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
                <option value="available">Còn trống</option>
                <option value="occupied">Đã thuê</option>
                <option value="maintenance">Đang bảo trì</option>
              </select>
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

      {/* Rooms Table */}
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
                      onClick={() => requestSort("room_number")}
                    >
                      <div className="flex items-center">
                        Số phòng
                        {sortConfig.key === "room_number" &&
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
                      onClick={() => requestSort("building")}
                    >
                      <div className="flex items-center">
                        Tòa nhà
                        {sortConfig.key === "building" &&
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
                      onClick={() => requestSort("type")}
                    >
                      <div className="flex items-center">
                        Loại phòng
                        {sortConfig.key === "type" &&
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
                      onClick={() => requestSort("capacity")}
                    >
                      <div className="flex items-center">
                        Sức chứa
                        {sortConfig.key === "capacity" &&
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
                      onClick={() => requestSort("occupants")}
                    >
                      <div className="flex items-center">
                        Số người ở
                        {sortConfig.key === "occupants" &&
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
                      onClick={() => requestSort("price")}
                    >
                      <div className="flex items-center">
                        Giá phòng
                        {sortConfig.key === "price" &&
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tiện nghi
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
                  {currentRooms.length > 0 ? (
                    currentRooms.map((room) => (
                      <tr key={room.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {room.room_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Tòa {room.building}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.type === "Standard"
                            ? "Tiêu chuẩn"
                            : room.type === "Premium"
                            ? "Cao cấp"
                            : room.type === "Deluxe"
                            ? "Đặc biệt"
                            : room.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.capacity} người
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {room.occupants}/{room.capacity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(room.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(room.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {room.facilities.map((facility, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                              >
                                {facility}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openEditModal(room)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <FaEdit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(room)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FaTrash className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        Không tìm thấy phòng nào với bộ lọc hiện tại
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredRooms.length > roomsPerPage && (
              <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị{" "}
                    <span className="font-medium">{indexOfFirstRoom + 1}</span>{" "}
                    đến{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastRoom, filteredRooms.length)}
                    </span>{" "}
                    trong tổng số{" "}
                    <span className="font-medium">{filteredRooms.length}</span>{" "}
                    phòng
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
                      length: Math.ceil(filteredRooms.length / roomsPerPage),
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
                        Math.ceil(filteredRooms.length / roomsPerPage)
                      }
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        currentPage ===
                        Math.ceil(filteredRooms.length / roomsPerPage)
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

      {/* Add Room Modal */}
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
              <form onSubmit={handleAddRoom}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Thêm phòng mới
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số phòng
                      </label>
                      <input
                        type="text"
                        name="room_number"
                        value={formData.room_number}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tòa nhà
                      </label>
                      <select
                        name="building"
                        value={formData.building}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Chọn tòa nhà</option>
                        <option value="A">Tòa A</option>
                        <option value="B">Tòa B</option>
                        <option value="C">Tòa C</option>
                        <option value="D">Tòa D</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tầng
                      </label>
                      <input
                        type="number"
                        name="floor"
                        value={formData.floor}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Loại phòng
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Chọn loại phòng</option>
                        <option value="Standard">Tiêu chuẩn</option>
                        <option value="Premium">Cao cấp</option>
                        <option value="Deluxe">Đặc biệt</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sức chứa
                      </label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Giá phòng (VND)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="100000"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trạng thái
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="available">Còn trống</option>
                      <option value="occupied">Đã thuê</option>
                      <option value="maintenance">Đang bảo trì</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiện nghi
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Wifi",
                        "Air Conditioner",
                        "Fridge",
                        "TV",
                        "Private Bathroom",
                        "Desk",
                        "Wardrobe",
                      ].map((facility) => (
                        <div key={facility} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`facility-${facility}`}
                            checked={formData.facilities.includes(facility)}
                            onChange={() => handleFacilityChange(facility)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`facility-${facility}`}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {facility}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Thêm phòng
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

      {/* Edit Room Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleUpdateRoom}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Chỉnh sửa phòng {selectedRoom?.room_number}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số phòng
                      </label>
                      <input
                        type="text"
                        name="room_number"
                        value={formData.room_number}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    {/* Other form fields identical to Add Room modal */}
                    {/* Building, Floor, Type, Capacity, Price */}
                    {/* ... */}
                  </div>

                  {/* Status and Facilities sections identical to Add Room modal */}
                  {/* ... */}
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
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

      {/* Delete Room Modal */}
      {showDeleteModal && (
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
                      Xóa phòng
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bạn có chắc chắn muốn xóa phòng{" "}
                        {selectedRoom?.room_number}? Hành động này không thể
                        hoàn tác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteRoom}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Xóa
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
    </div>
  );
};

export default Rooms;
