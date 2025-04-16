import React, { useState, useEffect } from "react";
import ModalLayout from "./ModalLayout";

const EditRoomModal = ({
  dormitories,
  initialData,
  onClose,
  onSubmit,
  roomNumber,
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle facility checkboxes
  const handleFacilityChange = (facility) => {
    let updatedFacility = formData.facility;

    if (typeof updatedFacility === "string") {
      const facilityArray = updatedFacility ? updatedFacility.split(", ") : [];

      if (facilityArray.includes(facility)) {
        updatedFacility = facilityArray
          .filter((f) => f !== facility)
          .join(", ");
      } else {
        facilityArray.push(facility);
        updatedFacility = facilityArray.join(", ");
      }
    }

    setFormData({
      ...formData,
      facility: updatedFacility,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if (success) onClose();
  };

  return (
    <ModalLayout title={`Chỉnh sửa phòng ${roomNumber}`} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số phòng
            </label>
            <input
              type="text"
              name="room_number"
              value={formData.room_number}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ký túc xá
            </label>
            <select
              name="dormitory_id"
              value={formData.dormitory_id}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Chọn ký túc xá</option>
              {dormitories.map((dorm) => (
                <option key={dorm.id} value={dorm.id}>
                  {dorm.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loại phòng
            </label>
            <select
              name="room_type"
              value={formData.room_type}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Chọn loại phòng</option>
              <option value="Standard">Tiêu chuẩn</option>
              <option value="Premium">Cao cấp</option>
              <option value="Deluxe">Đặc biệt</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sức chứa
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số người ở hiện tại
            </label>
            <input
              type="number"
              name="current_occupancy"
              value={formData.current_occupancy}
              onChange={handleInputChange}
              required
              min="0"
              max={formData.capacity}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá phòng (VND)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="100000"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="available">Còn trống</option>
              <option value="occupied">Đã thuê</option>
              <option value="maintenance">Đang bảo trì</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiện nghi
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Wifi",
              "Air Conditioner",
              "Fridge",
              "TV",
              "Private Bathroom",
              "Desk",
              "Wardrobe",
            ].map((facility) => (
              <div key={facility} className="flex items-center">
                <input
                  type="checkbox"
                  id={`facility-edit-${facility}`}
                  checked={formData.facility?.includes(facility)}
                  onChange={() => handleFacilityChange(facility)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`facility-edit-${facility}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {facility}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={onClose}
            className="mr-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default EditRoomModal;
