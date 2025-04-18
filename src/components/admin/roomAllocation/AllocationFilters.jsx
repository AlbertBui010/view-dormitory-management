import React from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { roomAllocationStatus } from "../../../constant/constants";

const AllocationFilters = ({
  rooms,
  filters,
  searchTerm,
  setSearchTerm,
  handleFilterChange,
  handleDateRangeChange,
  resetFilters,
}) => {
  return (
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
              {Object.entries(roomAllocationStatus).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
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
  );
};

export default AllocationFilters;
