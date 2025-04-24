import {
  FaCheck,
  FaClock,
  FaEdit,
  FaEye,
  FaPrint,
  FaSort,
  FaSortDown,
  FaSortUp,
  FaTrash,
} from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import { paymentStatusLabels } from "../../../constant/constants";

const PaymentTable = ({
  payments,
  isLoading,
  sortConfig,
  requestSort,
  openViewModal,
  openEditModal,
  openDeleteModal,
  openReceiptModal,
  markAsPaid,
  markAsOverdue,
  formatDate,
  formatCurrency,
  getPaymentMethodText,
}) => {
  const getSortDirection = (key) => {
    if (!sortConfig) {
      return null;
    }
    return sortConfig.key === key ? sortConfig.direction : null;
  };

  const renderSortIcon = (columnName) => {
    const direction = getSortDirection(columnName);
    if (!direction) {
      return <FaSort className="h-3 w-3 ml-1 text-gray-400" />;
    }
    return direction === "ascending" ? (
      <FaSortUp className="h-3 w-3 ml-1 text-blue-600" />
    ) : (
      <FaSortDown className="h-3 w-3 ml-1 text-blue-600" />
    );
  };

  if (isLoading) {
    return (
      <div className="px-4 py-12 flex justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div className="px-4 py-12 flex justify-center">
        <EmptyState
          title="Không có khoản thu nào"
          description="Chưa có dữ liệu thanh toán, hãy thêm khoản thu mới."
          icon={<FaMoneyBillWave className="h-12 w-12 text-gray-400" />}
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => requestSort("id")}
              >
                Mã{" "}
                <span className="inline-block ml-1">
                  {renderSortIcon("id")}
                </span>
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => requestSort("student")}
              >
                Sinh viên{" "}
                <span className="inline-block ml-1">
                  {renderSortIcon("student")}
                </span>
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => requestSort("room")}
              >
                Phòng{" "}
                <span className="inline-block ml-1">
                  {renderSortIcon("room")}
                </span>
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => requestSort("amount")}
              >
                Số tiền{" "}
                <span className="inline-block ml-1">
                  {renderSortIcon("amount")}
                </span>
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => requestSort("payment_date")}
              >
                Ngày{" "}
                <span className="inline-block ml-1">
                  {renderSortIcon("payment_date")}
                </span>
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => requestSort("payment_method")}
              >
                Phương thức{" "}
                <span className="inline-block ml-1">
                  {renderSortIcon("payment_method")}
                </span>
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <button
                className="flex items-center font-medium focus:outline-none"
                onClick={() => requestSort("payment_status")}
              >
                Trạng thái{" "}
                <span className="inline-block ml-1">
                  {renderSortIcon("payment_status")}
                </span>
              </button>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {payment.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {payment?.roomAllocation?.Student?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {payment?.roomAllocation?.student_id}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">
                    {payment?.roomAllocation?.Room?.room_number}
                  </span>
                  <span className="text-xs text-gray-500">
                    Tòa {payment?.roomAllocation?.Room?.Dormitory?.name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatCurrency(payment?.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(payment?.payment_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {getPaymentMethodText(payment?.payment_method)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={payment?.payment_status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  {/* View details button */}
                  <button
                    onClick={() => openViewModal(payment)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Xem chi tiết"
                  >
                    <FaEye className="h-4 w-4" />
                  </button>

                  {/* Print receipt button - only for paid payments */}
                  {payment.payment_status === paymentStatusLabels.PAID && (
                    <button
                      onClick={() => openReceiptModal(payment)}
                      className="text-green-600 hover:text-green-900"
                      title="In biên lai"
                    >
                      <FaPrint className="h-4 w-4" />
                    </button>
                  )}

                  {/* Edit button */}
                  <button
                    onClick={() => openEditModal(payment)}
                    className="text-indigo-600 hover:text-indigo-900"
                    title="Chỉnh sửa"
                  >
                    <FaEdit className="h-4 w-4" />
                  </button>

                  {/* Mark as paid button - only for pending or overdue payments */}
                  {(payment.payment_status === paymentStatusLabels.UNPAID ||
                    payment.payment_status === paymentStatusLabels.OVERDUE) && (
                    <button
                      onClick={() => markAsPaid(payment)}
                      className="text-green-600 hover:text-green-900"
                      title="Đánh dấu đã thanh toán"
                    >
                      <FaCheck className="h-4 w-4" />
                    </button>
                  )}

                  {/* Mark as overdue - only for pending payments */}
                  {payment.payment_status === paymentStatusLabels.UNPAID && (
                    <button
                      onClick={() => markAsOverdue(payment)}
                      className="text-yellow-600 hover:text-yellow-900"
                      title="Đánh dấu quá hạn"
                    >
                      <FaClock className="h-4 w-4" />
                    </button>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={() => openDeleteModal(payment)}
                    className="text-red-600 hover:text-red-900"
                    title="Xóa"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
