import React, { useMemo } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import {
  studentMajorsLabels,
  studentStatusLabels,
} from "../../../constant/constants";

const StudentFilters = ({
  searchTerm,
  setSearchTerm,
  filters,
  handleFilterChange,
  resetFilters,
  students,
}) => {
  const uniqueStudentMajors = useMemo(() => {
    if (!Array.isArray(students)) return [];

    // Lọc ra các loại phòng duy nhất
    return [...new Set(students.map((student) => student.major))]
      .filter((type) => type) // Loại bỏ các giá trị null/undefined
      .sort(); // Sắp xếp theo thứ tự alphabet
  }, [students]);

  const uniqueStudentStatuses = useMemo(() => {
    if (!Array.isArray(students)) return [];

    return [...new Set(students.map((student) => student.status))]
      .filter((status) => status)
      .sort();
  }, [students]);

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
              placeholder="Tìm kiếm sinh viên..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* Gender filter */}
          <div>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Tất cả giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          {/* Major filter */}
          <div>
            <select
              name="major"
              value={filters.major}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Tất cả ngành học</option>
              {uniqueStudentMajors.map((status) => (
                <option key={status} value={status}>
                  {studentMajorsLabels[status] || status}
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
              {uniqueStudentStatuses.map((status) => (
                <option key={status} value={status}>
                  {studentStatusLabels[status] || status}
                </option>
              ))}
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

export default StudentFilters;
