const DeletePaymentModal = ({
  showDeleteModal,
  selectedPayment,
  handleDeletePayment,
  setShowDeleteModal,
  formatCurrency,
}) => {
  if (!showDeleteModal || !selectedPayment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Xác nhận xóa</h3>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center text-red-600 mb-4">
            <FaExclamationTriangle className="h-12 w-12" />
          </div>

          <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
            Bạn chắc chắn muốn xóa khoản thu này?
          </h3>

          <p className="text-sm text-gray-500 text-center mb-4">
            Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan đến khoản
            thu này sẽ bị xóa vĩnh viễn.
          </p>

          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Mã khoản thu:</span>{" "}
              {selectedPayment.id}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Sinh viên:</span>{" "}
              {selectedPayment.student?.fullName} ({selectedPayment.student?.id}
              )
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Phòng:</span>{" "}
              {selectedPayment.room?.room_number} (Tòa{" "}
              {selectedPayment.room?.building})
            </p>
            <p className="text-sm text-gray-700 font-medium">
              <span className="font-medium">Số tiền:</span>{" "}
              {formatCurrency(selectedPayment.amount)}
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              onClick={handleDeletePayment}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
            >
              <FaTrash className="mr-2" /> Xóa khoản thu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePaymentModal;
