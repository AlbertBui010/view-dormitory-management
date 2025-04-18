import React from "react";
import { FaBed, FaUserGraduate } from "react-icons/fa";

const AllocationDashboard = ({
  totalAllocations,
  activeAllocations,
  availableRooms,
  unassignedStudents,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Tổng số phân phòng</p>
            <p className="text-2xl font-bold">{totalAllocations}</p>
          </div>
          <div className="p-3 rounded-full bg-blue-100 text-blue-800">
            <FaBed className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Sinh viên đang ở</p>
            <p className="text-2xl font-bold">{activeAllocations}</p>
          </div>
          <div className="p-3 rounded-full bg-green-100 text-green-800">
            <FaUserGraduate className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Phòng trống còn chỗ</p>
            <p className="text-2xl font-bold">{availableRooms}</p>
          </div>
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
            <FaBed className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Sinh viên chưa phân phòng</p>
            <p className="text-2xl font-bold">{unassignedStudents}</p>
          </div>
          <div className="p-3 rounded-full bg-red-100 text-red-800">
            <FaUserGraduate className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocationDashboard;
