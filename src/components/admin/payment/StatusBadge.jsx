// Status Badge Component
const StatusBadge = ({ status }) => {
  switch (status) {
    case "PAID":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Đã thanh toán
        </span>
      );
    case "UNPAID":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
          Chưa thanh toán
        </span>
      );
    case "OVERDUE":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
          Quá hạn
        </span>
      );
    case "CANCELLED":
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
