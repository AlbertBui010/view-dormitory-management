import React from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaSortAmountUp,
  FaSortAmountDown,
} from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import { studentMajorsLabels } from "../../../constant/constants";

const StudentsTable = ({
  students,
  sortConfig,
  requestSort,
  openViewModal,
  openEditModal,
  openDeleteModal,
}) => {
  return (
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
                MSSV
                {sortConfig.key === "id" &&
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
              onClick={() => requestSort("name")}
            >
              <div className="flex items-center">
                Họ và tên
                {sortConfig.key === "name" &&
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
              onClick={() => requestSort("email")}
            >
              <div className="flex items-center">
                Email
                {sortConfig.key === "email" &&
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
              onClick={() => requestSort("roomAssigned")}
            >
              <div className="flex items-center">
                Phòng
                {sortConfig.key === "roomAssigned" &&
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
              onClick={() => requestSort("major")}
            >
              <div className="flex items-center">
                Ngành học
                {sortConfig.key === "major" &&
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
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.roomAssigned ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {student.roomAssigned}
                    </span>
                  ) : (
                    <span className="text-gray-400">Chưa phân phòng</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {studentMajorsLabels[student.major]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={student.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openViewModal(student)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Xem chi tiết"
                    >
                      <FaEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openEditModal(student)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Chỉnh sửa"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(student)}
                      className="text-red-600 hover:text-red-900"
                      title="Xóa"
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
                colSpan="7"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                Không tìm thấy sinh viên nào phù hợp với điều kiện tìm kiếm
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
