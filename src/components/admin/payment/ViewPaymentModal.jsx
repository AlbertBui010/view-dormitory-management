import { FaPrint, FaTimes } from "react-icons/fa";

const ViewPaymentModal = ({
  showViewModal,
  selectedPayment,
  setShowViewModal,
  formatDate,
  formatCurrency,
  generateInvoiceNumber,
  getPaymentMethodIcon,
  getPaymentMethodText,
  getStatusBadge,
  printReceipt,
}) => {
  if (!showViewModal || !selectedPayment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Chi tiết khoản thu</h3>
          <button
            onClick={() => setShowViewModal(false)}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Invoice header */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Biên lai thanh toán #{generateInvoiceNumber(selectedPayment)}
                </h3>
                <p className="text-sm text-gray-500">
                  Ngày: {formatDate(selectedPayment.payment_date)}
                </p>
              </div>
              <div className="flex items-center">
                {getStatusBadge(selectedPayment.payment_status)}
              </div>
            </div>
          </div>

          {/* Student and Room Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Thông tin sinh viên
              </h4>
              <p className="text-gray-900 font-medium">
                {selectedPayment.student?.fullName}
              </p>
              <p className="text-gray-600 text-sm">
                {selectedPayment.student?.id}
              </p>
              <p className="text-gray-600 text-sm">
                {selectedPayment.student?.email || "Không có email"}
              </p>
              <p className="text-gray-600 text-sm">
                {selectedPayment.student?.phone || "Không có số điện thoại"}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Thông tin phòng
              </h4>
              <p className="text-gray-900 font-medium">
                Phòng {selectedPayment.room?.room_number}
              </p>
              <p className="text-gray-600 text-sm">
                Tòa {selectedPayment.room?.building}
              </p>
              <p className="text-gray-600 text-sm">
                Loại phòng: {selectedPayment.room?.room_type || "Tiêu chuẩn"}
              </p>
              <p className="text-gray-600 text-sm">
                Sức chứa: {selectedPayment.room?.capacity} người
              </p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-3">
              Chi tiết thanh toán
            </h4>
            <div className="bg-gray-50 rounded-md overflow-hidden">
              <table className="min-w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-600">Mô tả</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      Thanh toán tiền phòng ký túc xá
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Phương thức thanh toán
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      <div className="flex items-center">
                        <span className="mr-2">
                          {getPaymentMethodIcon(selectedPayment.payment_method)}
                        </span>
                        {getPaymentMethodText(selectedPayment.payment_method)}
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Ngày thanh toán
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {formatDate(selectedPayment.payment_date)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-600">Ghi chú</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {selectedPayment.notes || "Không có ghi chú"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      Tổng tiền
                    </td>
                    <td className="px-4 py-3 text-lg text-blue-600 font-bold">
                      {formatCurrency(selectedPayment.amount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 mb-6">
            <div className="flex justify-between mb-1">
              <span>Mã khoản thu:</span>
              <span className="font-medium">{selectedPayment.id}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Tạo bởi:</span>
              <span className="font-medium">{selectedPayment.created_by}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Ngày tạo:</span>
              <span className="font-medium">
                {formatDate(selectedPayment.created_at)}
              </span>
            </div>
            {selectedPayment.updated_by && (
              <>
                <div className="flex justify-between mb-1">
                  <span>Cập nhật bởi:</span>
                  <span className="font-medium">
                    {selectedPayment.updated_by}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cập nhật lần cuối:</span>
                  <span className="font-medium">
                    {formatDate(selectedPayment.updated_at)}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowViewModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
            >
              Đóng
            </button>
            {selectedPayment.payment_status === "paid" && (
              <button
                onClick={printReceipt}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <FaPrint className="mr-2" /> In biên lai
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaymentModal;
