import React from "react";
import {
  FaSortAmountUp,
  FaSortAmountDown,
  FaUserGraduate,
  FaExchangeAlt,
  FaTrash,
} from "react-icons/fa";
import StatusBadge from "./StatusBadge";

const AllocationTable = ({
  allocations,
  sortConfig,
  requestSort,
  openMoveModal,
  openDeleteModal,
  formatDate,
}) => {
  console.log("ALLO", allocations);
  return (
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
              onClick={() => requestSort("createdAt")}
            >
              <div className="flex items-center">
                Ngày tạo
                {sortConfig.key === "createdAt" &&
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
          {allocations.length > 0 ? (
            allocations.map((allocation) => (
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
                    {/* Tòa {allocation.Dormitory.name} */}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(allocation.start_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(allocation.end_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={allocation.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(allocation.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {allocation.status === "DANGO" && (
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
                Không tìm thấy phân phòng nào phù hợp với điều kiện tìm kiếm
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllocationTable;
