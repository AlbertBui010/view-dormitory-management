import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";

const PaymentFilters = ({
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
  rooms,
  students,
  resetFilters,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState(filters.dateRange[0]);
  const [endDate, setEndDate] = useState(filters.dateRange[1]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    setFilters({
      ...filters,
      dateRange: [start, end],
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        {/* Search bar */}
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Tìm kiếm khoản thu..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        {/* Filter toggle button */}
        <div className="flex space-x-2">
          <button
            onClick={toggleFilters}
            className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
          >
            <FaFilter className="mr-2" />
            {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </button>

          {(filters.studentId ||
            filters.status ||
            filters.dateRange[0] ||
            searchTerm) && (
            <button
              onClick={resetFilters}
              className="flex items-center px-3 py-2 bg-red-50 hover:bg-red-100 rounded-md text-red-600"
            >
              <FaTimes className="mr-2" />
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
          {/* Student filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sinh viên
            </label>
            <select
              name="studentId"
              value={filters.studentId}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả sinh viên</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.fullName} ({student.id})
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="paid">Đã thanh toán</option>
              <option value="pending">Chờ thanh toán</option>
              <option value="overdue">Quá hạn</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          {/* Date range filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khoảng thời gian
            </label>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateRangeChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Chọn khoảng thời gian"
              dateFormat="dd/MM/yyyy"
              isClearable
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentFilters;
