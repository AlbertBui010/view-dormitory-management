// Status Badge Component
const StatusBadge = ({ status }) => {
  switch (status) {
    case "paid":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Đã thanh toán
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
          Chờ thanh toán
        </span>
      );
    case "overdue":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
          Quá hạn
        </span>
      );
    case "cancelled":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
          Đã hủy
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
