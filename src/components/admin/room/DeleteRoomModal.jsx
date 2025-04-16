import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import ModalLayout from "./ModalLayout";

const DeleteRoomModal = ({ room, onClose, onDelete }) => {
  const handleDelete = async () => {
    const success = await onDelete();
    if (success) onClose();
  };

  return (
    <ModalLayout title="Xóa phòng" onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FaExclamationTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg font-medium text-gray-900">Xóa phòng</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Bạn có chắc chắn muốn xóa phòng {room.room_number}? Hành động này
              không thể hoàn tác.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={handleDelete}
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
        >
          Xóa
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Hủy bỏ
        </button>
      </div>
    </ModalLayout>
  );
};

export default DeleteRoomModal;
