import React from "react";
import {
  FaEdit,
  FaTrash,
  FaSortAmountUp,
  FaSortAmountDown,
} from "react-icons/fa";
import StatusBadge from "./StatusBadge";

const RoomsTable = ({
  currentRooms,
  dormitories,
  sortConfig,
  requestSort,
  openEditModal,
  openDeleteModal,
}) => {
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
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
                  KTX
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
                onClick={() => requestSort("room_type")}
              >
                <div className="flex items-center">
                  Loại phòng
                  {sortConfig.key === "room_type" &&
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
                    {dormitories.find((dorm) => dorm.id === room.dormitory_id)
                      ?.name || "Không xác định"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.room_type === "Standard"
                      ? "Tiêu chuẩn"
                      : room.room_type === "Premium"
                      ? "Cao cấp"
                      : room.room_type === "Deluxe"
                      ? "Đặc biệt"
                      : room.room_type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.capacity} người
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.current_occupancy}/{room.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(room.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={room.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <FacilityTags facility={room.facility} />
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
    </div>
  );
};

// Subcomponent for facility tags
const FacilityTags = ({ facility }) => {
  if (!facility) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {facility.split(", ").map((item, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default RoomsTable;
