import { FaPrint, FaTimes } from "react-icons/fa";

const ReceiptModal = ({
  showReceiptModal,
  selectedPayment,
  setShowReceiptModal,
  formatDate,
  formatCurrency,
  generateInvoiceNumber,
  getPaymentMethodText,
  printReceipt,
}) => {
  if (!showReceiptModal || !selectedPayment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 overflow-hidden">
        <div className="bg-green-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Biên lai thanh toán</h3>
          <button
            onClick={() => setShowReceiptModal(false)}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Receipt Preview */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mx-auto max-w-2xl shadow-sm">
            {/* Receipt Header */}
            <div className="text-center border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-2xl font-bold mb-1">BIÊN LAI THANH TOÁN</h2>
              <p className="text-gray-600 mb-1">
                Mã hóa đơn: {generateInvoiceNumber(selectedPayment)}
              </p>
              <p className="text-gray-600">
                Ngày: {formatDate(selectedPayment.payment_date)}
              </p>
            </div>

            {/* Student and Room Info */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Sinh viên:</span>
                <span className="font-medium">
                  {selectedPayment.student?.fullName} (
                  {selectedPayment.student?.id})
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Phòng:</span>
                <span className="font-medium">
                  {selectedPayment.room?.room_number} (Tòa{" "}
                  {selectedPayment.room?.building})
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Mô tả:</span>
                <span className="font-medium">
                  Thanh toán tiền phòng ký túc xá
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức thanh toán:</span>
                <span className="font-medium">
                  {getPaymentMethodText(selectedPayment.payment_method)}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Total */}
            <div className="flex justify-between mb-8">
              <span className="text-lg font-bold">Tổng tiền:</span>
              <span className="text-lg font-bold text-green-600">
                {formatCurrency(selectedPayment.amount)}
              </span>
            </div>

            {/* Signature */}
            <div className="grid grid-cols-2 gap-10 mt-12">
              <div className="text-center">
                <div className="border-t border-gray-300 pt-2 mt-16">
                  <p className="text-sm font-medium">Người thu tiền</p>
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-gray-300 pt-2 mt-16">
                  <p className="text-sm font-medium">Người nộp tiền</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
              <p>
                Biên lai này là bằng chứng thanh toán chính thức. Vui lòng giữ
                lại để tham khảo trong tương lai.
              </p>
              <p className="mt-1">
                © {new Date().getFullYear()} Ký túc xá Trường Đại học
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="bg-white px-6 py-4 flex justify-end">
          <button
            onClick={() => setShowReceiptModal(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 mr-3"
          >
            Đóng
          </button>
          <button
            onClick={printReceipt}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
          >
            <FaPrint className="mr-2" /> In biên lai
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
