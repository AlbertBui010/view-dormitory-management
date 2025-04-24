import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import dormitoryService from "../../services/admin/dormitoryService";
import roomService from "../../services/admin/roomService";

// Import các components con
import RoomFilters from "./room/RoomFilters";
import RoomsTable from "./room/RoomsTable";
import Pagination from "../admin/payment/Pagination";
import AddRoomModal from "./room/AddRoomModal";
import EditRoomModal from "./room/EditRoomModal";
import DeleteRoomModal from "./room/DeleteRoomModal";
import Spinner from "../Spinner";
import { roomStatusLabels } from "../../constant/constants";

const Rooms = () => {
  const navigate = useNavigate();

  // State for rooms data
  const [dormitories, setDormitories] = useState([]);
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
    dormitory_id: "",
    capacity: 0,
    current_occupancy: 0,
    room_type: "",
    price: 0,
    facility: "",
    status: "AVAILABLE",
  });

  // State for filters
  const [filters, setFilters] = useState({
    dormitory_id: "",
    room_type: "",
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

  // Fetch dormitories
  useEffect(() => {
    const fetchDormitories = async () => {
      try {
        const data = await dormitoryService.getAllDormitories();
        if (data && data.status === 401) {
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          navigate("/login");
          return;
        }
        setDormitories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching dormitories:", error);
        toast.error("Không thể tải dữ liệu ký túc xá");
      }
    };

    fetchDormitories();
  }, [navigate]);

  // Fetch rooms data
  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const data = await roomService.getAllRooms();
        if (Array.isArray(data)) {
          const normalizedRooms = data.map((room) => ({
            ...room,
            price: room.price || 0,
            building: room.Dormitory?.name || "Không xác định",
          }));
          setRooms(normalizedRooms);
          setFilteredRooms(normalizedRooms);
        } else if (data && data.status === 401) {
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          navigate("/login");
          setRooms([]);
          setFilteredRooms([]);
        } else {
          toast.error("Không thể tải dữ liệu phòng.");
          setRooms([]);
          setFilteredRooms([]);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Không thể tải dữ liệu phòng. Vui lòng thử lại sau.");
        setRooms([]);
        setFilteredRooms([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, [navigate]);

  // Apply filters
  useEffect(() => {
    if (!Array.isArray(rooms)) {
      setFilteredRooms([]);
      return;
    }

    let result = [...rooms];

    // Apply search and filters
    if (searchTerm) {
      result = result.filter(
        (room) =>
          room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (room.building || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (room.room_type || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.dormitory_id) {
      result = result.filter(
        (room) => room.dormitory_id.toString() === filters.dormitory_id
      );
    }

    if (filters.room_type) {
      result = result.filter((room) => room.room_type === filters.room_type);
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
        (room.price || 0) >= filters.priceRange[0] &&
        (room.price || 0) <= filters.priceRange[1]
    );

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const valueA = a[sortConfig.key] || 0;
        const valueB = b[sortConfig.key] || 0;

        if (valueA < valueB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredRooms(result);
    setCurrentPage(1);
  }, [rooms, searchTerm, filters, sortConfig]);

  // Open edit modal and populate form
  const openEditModal = (room) => {
    setSelectedRoom(room);
    setFormData({
      room_number: room.room_number,
      dormitory_id: room.dormitory_id,
      capacity: room.capacity,
      current_occupancy: room.current_occupancy,
      room_type: room.room_type,
      price: room.price,
      facility: room.facility,
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
      dormitory_id: "",
      capacity: 0,
      current_occupancy: 0,
      room_type: "",
      price: 0,
      facility: "",
      status: "available",
    });
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
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
      dormitory_id: "",
      room_type: "",
      status: "",
      priceRange: [0, 5000000],
      capacity: "",
    });
    setSearchTerm("");
  };

  // Add new room
  const handleAddRoom = async (roomData) => {
    try {
      setIsLoading(true);
      const response = await roomService.createRoom(roomData);
      if (response && response.status === 401) {
        toast.error(response.message);
        navigate("/login");
        return false;
      }

      // Chuẩn hóa dữ liệu mới
      const normalizedNewRoom = {
        ...response,
        price: response.price || 0,
        building: getDormitoryName(response.dormitory_id),
      };

      setRooms([...rooms, normalizedNewRoom]);
      toast.success("Thêm phòng thành công");
      return true;
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error("Không thể thêm phòng. Vui lòng thử lại sau.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update room
  const handleUpdateRoom = async (roomData) => {
    try {
      setIsLoading(true);
      const updatedRoom = await roomService.updateRoom(
        selectedRoom.id,
        roomData
      );

      if (updatedRoom && updatedRoom.status && updatedRoom.message) {
        toast.error(updatedRoom.message);
        return false;
      }

      const normalizedUpdatedRoom = {
        ...updatedRoom,
        price: updatedRoom.price || 0,
        building: getDormitoryName(updatedRoom.dormitory_id),
      };

      const updatedRooms = rooms.map((room) =>
        room.id === selectedRoom.id ? normalizedUpdatedRoom : room
      );

      setRooms(updatedRooms);
      toast.success("Cập nhật phòng thành công");
      return true;
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Không thể cập nhật phòng. Vui lòng thử lại sau.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete room
  const handleDeleteRoom = async () => {
    try {
      setIsLoading(true);
      await roomService.deleteRoom(selectedRoom.id);
      const updatedRooms = rooms.filter((room) => room.id !== selectedRoom.id);
      setRooms(updatedRooms);
      toast.success("Xóa phòng thành công");
      return true;
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error(error?.data?.error);
      return false;
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  };

  // Helper function to get dormitory
  const getDormitoryName = (dormitoryId) => {
    const dormitory = dormitories.find(
      (dorm) => dorm.id === Number(dormitoryId)
    );
    return dormitory ? dormitory.name : "Không xác định";
  };

  // Get current rooms for pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = Array.isArray(filteredRooms)
    ? filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)
    : [];

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

      {/* Filters Component */}
      <RoomFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        dormitories={dormitories}
        rooms={rooms}
      />

      {/* Rooms Table Component */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        </div>
      ) : (
        <RoomsTable
          currentRooms={currentRooms}
          dormitories={dormitories}
          sortConfig={sortConfig}
          requestSort={requestSort}
          openEditModal={openEditModal}
          openDeleteModal={openDeleteModal}
        />
      )}

      {/* Pagination Component */}
      {filteredRooms?.length > roomsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredRooms.length}
          itemsPerPage={roomsPerPage}
          paginate={setCurrentPage}
          indexOfFirstItem={indexOfFirstRoom}
          indexOfLastItem={Math.min(indexOfLastRoom, filteredRooms.length)}
        />
      )}

      {/* Modal Components */}
      {showAddModal && (
        <AddRoomModal
          dormitories={dormitories}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddRoom}
        />
      )}

      {showEditModal && selectedRoom && (
        <EditRoomModal
          dormitories={dormitories}
          initialData={formData}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateRoom}
          roomNumber={selectedRoom.room_number}
        />
      )}

      {showDeleteModal && selectedRoom && (
        <DeleteRoomModal
          room={selectedRoom}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteRoom}
        />
      )}
    </div>
  );
};

export default Rooms;
