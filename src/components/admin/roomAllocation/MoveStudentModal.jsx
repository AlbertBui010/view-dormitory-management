import React from "react";

const MoveStudentModal = ({
  allocation,
  availableRooms,
  formData,
  handleInputChange,
  onClose,
  onSubmit,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={onSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Chuyển phòng cho sinh viên
              </h3>

              <div className="mb-4">
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <p className="text-sm text-gray-600">
                    Sinh viên:{" "}
                    <span className="font-medium">
                      {allocation.student.fullName}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Phòng hiện tại:{" "}
                    <span className="font-medium">
                      {allocation.room.room_number} (Tòa{" "}
                      {allocation.room.building})
                    </span>
                  </p>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phòng mới
                </label>
                <select
                  name="new_room_id"
                  value={formData.new_room_id}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn phòng mới</option>
                  {availableRooms
                    .filter((room) => room.id !== allocation.room_id)
                    .map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.room_number} (Tòa {room.building}) -{" "}
                        {room.current_occupancy}/{room.capacity} người
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lý do chuyển phòng
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Nhập lý do chuyển phòng"
                />
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              >
                Chuyển phòng
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

export default MoveStudentModal;
