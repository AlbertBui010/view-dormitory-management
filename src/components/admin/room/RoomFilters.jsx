import React from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

const RoomFilters = ({
  searchTerm,
  setSearchTerm,
  filters,
  handleFilterChange,
  resetFilters,
  dormitories,
}) => {
  return (
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
              name="dormitory_id"
              value={filters.dormitory_id}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Tất cả KTX</option>
              {dormitories.map((dorm) => (
                <option key={dorm.id} value={dorm.id.toString()}>
                  {dorm.name}
                </option>
              ))}
            </select>
          </div>

          {/* Room type filter */}
          <div>
            <select
              name="room_type"
              value={filters.room_type}
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
  );
};

export default RoomFilters;
