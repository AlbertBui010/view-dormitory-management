import DatePicker from "react-datepicker";
import { FaSave, FaTimes } from "react-icons/fa";
import {
  paymentMethodLabels,
  paymentStatusLabels,
} from "../../../constant/constants";

const AddPaymentModal = ({
  showAddModal,
  formData,
  handleInputChange,
  handleDateChange,
  handleAddPayment,
  resetFormData,
  setShowAddModal,
  rooms,
  students,
  studentRoomMap,
}) => {
  if (!showAddModal) return null;

  const handleClose = () => {
    resetFormData();
    setShowAddModal(false);
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    const roomId = studentRoomMap[studentId] || "";

    handleInputChange({
      target: { name: "student_id", value: studentId },
    });

    // Auto-select room if student already has a room assigned
    if (roomId) {
      handleInputChange({
        target: { name: "room_id", value: roomId },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Thêm khoản thu mới</h3>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleAddPayment} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Student Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Sinh viên <span className="text-red-600">*</span>
              </label>
              <select
                name="student_id"
                value={formData.student_id}
                onChange={handleStudentChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn sinh viên</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Room Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phòng <span className="text-red-600">*</span>
              </label>
              <select
                name="room_id"
                value={formData.room_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn phòng</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.room_number} (Tòa {room.Dormitory.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Số tiền <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số tiền"
                required
                min="0"
              />
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ngày thanh toán <span className="text-red-600">*</span>
              </label>
              <DatePicker
                selected={formData.payment_date}
                onChange={handleDateChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="dd/MM/yyyy"
                placeholderText="Chọn ngày"
                maxDate={new Date()}
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
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="pending">Chờ thanh toán</option>
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
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Nhập ghi chú (nếu có)"
            ></textarea>
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaSave className="mr-2" /> Lưu khoản thu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentModal;
