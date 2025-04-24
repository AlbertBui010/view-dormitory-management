import DatePicker from "react-datepicker";
import { FaSave, FaTimes } from "react-icons/fa";
import {
  paymentMethodLabels,
  paymentStatusLabels,
} from "../../../constant/constants";

const EditPaymentModal = ({
  showEditModal,
  selectedPayment,
  formData,
  handleInputChange,
  handleDateChange,
  handleUpdatePayment,
  resetFormData,
  setShowEditModal,
}) => {
  if (!showEditModal || !selectedPayment) return null;

  const handleClose = () => {
    resetFormData();
    setShowEditModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Cập nhật khoản thu</h3>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleUpdatePayment} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Student Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Sinh viên <span className="text-red-600">*</span>
              </label>
              <div
                name="student_id"
                value={formData.student_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value={selectedPayment.roomAllocation.Student.id}>
                  {selectedPayment.roomAllocation.Student.name}
                </option>
              </div>
            </div>

            {/* Room Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phòng <span className="text-red-600">*</span>
              </label>
              <div
                name="room_id"
                value={formData.room_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value={selectedPayment.roomAllocation.Room.id}>
                  {selectedPayment.roomAllocation.Room.room_number}
                </option>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Số tiền <span className="text-red-600">*</span>
              </label>
              <div
                // type="number"
                name="amount"
                value={selectedPayment.amount}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={selectedPayment.amount}>
                  {selectedPayment.amount}
                </option>
              </div>
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ngày thanh toán <span className="text-red-600">*</span>
              </label>
              <DatePicker
                selected={formData.payment_date}
                onChange={handleDateChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                dateFormat="dd/MM/yyyy"
                placeholderText="Chọn ngày"
              />
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Trạng thái <span className="text-red-600">*</span>
              </label>
              <select
                name="payment_status"
                value={formData.payment_status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                {Object.entries(paymentStatusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phương thức thanh toán <span className="text-red-600">*</span>
              </label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                {Object.entries(paymentMethodLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Ghi chú
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
              placeholder="Nhập ghi chú (nếu có)"
            ></textarea>
          </div>

          {/* Payment info */}
          <div className="mb-4 bg-gray-50 p-3 rounded border border-gray-200 text-sm">
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Mã khoản thu:</span>{" "}
              {selectedPayment.id}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Ngày tạo:</span>{" "}
              {new Date(selectedPayment.createdAt).toLocaleDateString("vi-VN")}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Cập nhật lần cuối:</span>{" "}
              {selectedPayment.updated_at
                ? new Date(selectedPayment.updated_at).toLocaleDateString(
                    "vi-VN"
                  )
                : "Chưa có cập nhật"}
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
            >
              <FaSave className="mr-2" /> Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaymentModal;
