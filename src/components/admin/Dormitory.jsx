import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaTimes,
  FaBuilding,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api";
import Spinner from "../Spinner";
import EmptyState from "../EmptyState";
import dormitoryService from "../../services/admin/dormitoryService";
import formatDate from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

const Dormitory = () => {
  const navigate = useNavigate();

  // State declarations
  const [dormitories, setDormitories] = useState([]);
  const [filteredDormitories, setFilteredDormitories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDormitory, setSelectedDormitory] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    total_rooms: 0,
  });

  // Sort state
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  // Fetch dormitories data
  useEffect(() => {
    const fetchDormitories = async () => {
      setIsLoading(true);
      try {
        const data = await dormitoryService.getAllDormitories();

        // Kiểm tra nếu có lỗi token hết hạn
        if (data && data.status === 401) {
          // Redirect về trang login
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          setIsLoading(false);
          // Navigate tới trang login, nếu bạn dùng react-router-dom
          navigate("/login");
          return;
        }

        setDormitories(data);
        setFilteredDormitories(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dormitories:", error);
        toast.error("Không thể tải dữ liệu ký túc xá. Vui lòng thử lại sau.");
        setIsLoading(false);
      }
    };

    fetchDormitories();
  }, []);

  // Apply search filter
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDormitories(dormitories);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = dormitories.filter(
        (dorm) =>
          dorm.name.toLowerCase().includes(searchTermLower) ||
          dorm.address.toLowerCase().includes(searchTermLower) ||
          dorm.total_rooms.toString().includes(searchTermLower)
      );
      setFilteredDormitories(filtered);
    }
  }, [searchTerm, dormitories]);

  // Apply sorting
  useEffect(() => {
    if (sortConfig.key) {
      const sortedData = [...filteredDormitories].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredDormitories(sortedData);
    }
  }, [sortConfig]);

  // Request sort
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "total_rooms" ? parseInt(value, 10) || 0 : value,
    });
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: "",
      address: "",
      total_rooms: 0,
      created_by: "admin",
    });
  };

  // Open add modal
  const openAddModal = () => {
    resetFormData();
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (dormitory) => {
    setSelectedDormitory(dormitory);
    setFormData({
      name: dormitory.name,
      address: dormitory.address,
      total_rooms: dormitory.total_rooms,
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (dormitory) => {
    setSelectedDormitory(dormitory);
    setShowDeleteModal(true);
  };

  // Open view modal
  const openViewModal = (dormitory) => {
    setSelectedDormitory(dormitory);
    setShowViewModal(true);
  };

  // Handle add dormitory
  const handleAddDormitory = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Sử dụng dormitoryService thay vì gọi API trực tiếp
      const newDormitory = await dormitoryService.createDormitory(formData);

      // Cập nhật state danh sách ký túc xá
      setDormitories([...dormitories, newDormitory]);

      // Đóng modal và reset form
      setShowAddModal(false);
      resetFormData();

      // Hiển thị thông báo thành công
      toast.success("Ký túc xá đã được thêm thành công!");

      // Tắt trạng thái loading
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding dormitory:", error);

      // Hiển thị thông báo lỗi với chi tiết nếu có
      let errorMessage = "Không thể thêm ký túc xá. Vui lòng thử lại sau.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);

      // Tắt trạng thái loading
      setIsLoading(false);
    }
  };

  // Handle update dormitory
  const handleUpdateDormitory = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await dormitoryService.updateDormitory(
        selectedDormitory.id,
        formData
      );
      const updatedDormitories = dormitories.map((dorm) =>
        dorm.id === selectedDormitory.id ? response : dorm
      );
      setDormitories(updatedDormitories);
      setShowEditModal(false);
      toast.success("Ký túc xá đã được cập nhật thành công!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating dormitory:", error);
      toast.error("Không thể cập nhật ký túc xá. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  // Handle delete dormitory
  const handleDeleteDormitory = async () => {
    try {
      setIsLoading(true);
      await dormitoryService.deleteDormitory(selectedDormitory.id);
      const updatedDormitories = dormitories.filter(
        (dorm) => dorm.id !== selectedDormitory.id
      );
      setDormitories(updatedDormitories);
      setShowDeleteModal(false);
      toast.success("Ký túc xá đã được xóa thành công!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting dormitory:", error);
      toast.error("Không thể xóa ký túc xá. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="h-3 w-3 text-gray-400" />;
    }
    if (sortConfig.direction === "ascending") {
      return <FaSortUp className="h-3 w-3 text-blue-500" />;
    }
    return <FaSortDown className="h-3 w-3 text-blue-500" />;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý ký túc xá</h1>
        <p className="text-gray-600">
          Quản lý thông tin các ký túc xá trong hệ thống
        </p>
      </div>

      {/* Action buttons and search */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" />
          Thêm ký túc xá mới
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm ký túc xá..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-gray-400" />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <FaTimes className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Dormitory table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Spinner />
          </div>
        ) : filteredDormitories.length === 0 ? (
          <EmptyState
            icon={<FaBuilding className="h-12 w-12 text-gray-400" />}
            title="Không tìm thấy ký túc xá nào"
            description="Không có ký túc xá nào trong hệ thống hoặc phù hợp với từ khóa tìm kiếm."
            action={
              <button
                onClick={openAddModal}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Thêm ký túc xá mới
              </button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("id")}
                  >
                    <div className="flex items-center">
                      ID
                      {getSortIcon("id")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Tên ký túc xá
                      {getSortIcon("name")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("total_rooms")}
                  >
                    <div className="flex items-center">
                      Tổng số phòng
                      {getSortIcon("total_rooms")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("createdAt")}
                  >
                    <div className="flex items-center">
                      Ngày tạo
                      {getSortIcon("createdAt")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDormitories &&
                  filteredDormitories?.map((dorm) => (
                    <tr key={dorm.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {dorm.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dorm.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dorm.total_rooms}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(dorm.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openViewModal(dorm)}
                          className="text-blue-600 hover:text-blue-900 mx-1"
                          title="Xem chi tiết"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => openEditModal(dorm)}
                          className="text-yellow-600 hover:text-yellow-900 mx-1"
                          title="Chỉnh sửa"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => openDeleteModal(dorm)}
                          className="text-red-600 hover:text-red-900 mx-1"
                          title="Xóa"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Dormitory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate__animated animate__fadeInDown">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-6">Thêm ký túc xá mới</h2>
            <form onSubmit={handleAddDormitory}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tên ký túc xá
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Địa chỉ
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Tổng số phòng
                </label>
                <input
                  type="number"
                  name="total_rooms"
                  value={formData.total_rooms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Dormitory Modal */}
      {showEditModal && selectedDormitory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate__animated animate__fadeInDown">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-6">
              Chỉnh sửa thông tin ký túc xá
            </h2>
            <form onSubmit={handleUpdateDormitory}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tên ký túc xá
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Địa chỉ
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Tổng số phòng
                </label>
                <input
                  type="number"
                  name="total_rooms"
                  value={formData.total_rooms}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dormitory Modal */}
      {showDeleteModal && selectedDormitory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate__animated animate__fadeInDown">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-6">Xác nhận xóa</h2>
            <p className="text-gray-700 mb-6">
              Bạn có chắc chắn muốn xóa ký túc xá "{selectedDormitory.name}"?
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteDormitory}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Dormitory Modal */}
      {showViewModal && selectedDormitory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate__animated animate__fadeInDown">
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-6">Chi tiết ký túc xá</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">ID</p>
              <p className="text-lg">{selectedDormitory.id}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Tên ký túc xá</p>
              <p className="text-lg">{selectedDormitory.name}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Địa chỉ</p>
              <p className="text-lg">{selectedDormitory.address}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Tổng số phòng</p>
              <p className="text-lg">{selectedDormitory.total_rooms}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Người tạo</p>
              <p className="text-lg">{selectedDormitory.created_by}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Ngày tạo</p>
              <p className="text-lg">
                {formatDate(selectedDormitory.createdAt)}
              </p>
            </div>
            {selectedDormitory.updated_by && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Cập nhật bởi</p>
                <p className="text-lg">{selectedDormitory.updated_by}</p>
              </div>
            )}
            {selectedDormitory.updatedAt && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Ngày cập nhật</p>
                <p className="text-lg">
                  {formatDate(selectedDormitory.updatedAt)}
                </p>
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dormitory;
