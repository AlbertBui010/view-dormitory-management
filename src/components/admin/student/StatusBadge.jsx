import React from "react";

const StatusBadge = ({ status }) => {
  switch (status) {
    case "DANGHOC":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Đang học
        </span>
      );
    case "DATOTNGHIEP":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
          Đã tốt nghiệp
        </span>
      );
    case "DINHCHI":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
          Đình chỉ
        </span>
      );
    case "TAMNGHI":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
          Tạm nghỉ
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
          {status}
        </span>
      );
  }
};

export default StatusBadge;
