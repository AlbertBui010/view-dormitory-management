import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { roomAllocationStatus } from "../../../constant/constants";

const AddAllocationModal = ({
  formData,
  handleInputChange,
  handleDateChange,
  handleAddAllocation,
  unassignedStudents,
  availableRooms,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleAddAllocation}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Phân phòng mới
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sinh viên
                </label>
                <select
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn sinh viên</option>
                  {unassignedStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} ({student.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng
                </label>
                <select
                  name="room_id"
                  value={formData.room_id}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn phòng</option>
                  {availableRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.room_number} ({room.Dormitory.name}) -{" "}
                      {room.current_occupancy}/{room.capacity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày bắt đầu
                </label>
                <DatePicker
                  selected={formData.start_date}
                  onChange={(date) => handleDateChange(date, "start_date")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày kết thúc (không bắt buộc)
                </label>
                <DatePicker
                  selected={formData.end_date}
                  onChange={(date) => handleDateChange(date, "end_date")}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  dateFormat="dd/MM/yyyy"
                  minDate={formData.start_date}
                  isClearable
                  placeholderText="Chọn ngày kết thúc (nếu có)"
                />
              </div>

              {/* Status select */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="DANGKY">Đăng ký</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              >
                Phân phòng
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
              >
                Hủy bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAllocationModal;
