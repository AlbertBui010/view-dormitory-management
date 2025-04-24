import React from "react";
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
  allocations,
}) => {
  if (!showAddModal) return null;

  const handleClose = () => {
    resetFormData();
    setShowAddModal(false);
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
            {/* Room Allocation Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phân phòng <span className="text-red-600">*</span>
              </label>
              <select
                name="room_allocation_id"
                value={formData.room_allocation_id}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn phân phòng</option>
                {allocations.map((allocation) => (
                  <option key={allocation.id} value={allocation.id}>
                    SV: {allocation.student.name} - Phòng:{" "}
                    {allocation.room.room_number}
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
                step="0.01"
              />
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ngày thanh toán <span className="text-red-600">*</span>
              </label>
              <DatePicker
                selected={formData.payment_date}
                onChange={(date) => handleDateChange(date, "payment_date")}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                dateFormat="dd/MM/yyyy"
                placeholderText="Chọn ngày"
                maxDate={new Date()}
                required
              />
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Trạng thái thanh toán <span className="text-red-600">*</span>
              </label>
              <select
                name="payment_status"
                value={formData.payment_status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn trạng thái</option>
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
                <option value="">Chọn phương thức</option>
                {Object.entries(paymentMethodLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes (optional field) */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Ghi chú
            </label>
            <textarea
              name="notes"
              value={formData.notes || ""}
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
