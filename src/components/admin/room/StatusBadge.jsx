import React from "react";

const StatusBadge = ({ status }) => {
  const statusUpper = (status || "").toUpperCase();

  switch (statusUpper) {
    case "AVAILABLE":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Trống
        </span>
      );
    case "OCCUPIED":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
          Đã thuê
        </span>
      );
    case "MAINTENANCE":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
          Bảo trì
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
