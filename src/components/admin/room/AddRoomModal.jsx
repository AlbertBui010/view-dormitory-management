import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import { roomStatusLabels, roomTypeLabels } from "../../../constant/constants";

const AddRoomModal = ({ dormitories, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    room_number: "",
    dormitory_id: "",
    capacity: 0,
    current_occupancy: 0,
    room_type: "",
    price: 0,
    facility: "",
    status: "AVAILABLE",
  });

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
    <ModalLayout title="Thêm phòng mới" onClose={onClose}>
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
              {Object.entries(roomTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
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
              {Object.entries(roomStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
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
                  id={`facility-add-${facility}`}
                  checked={formData.facility?.includes(facility)}
                  onChange={() => handleFacilityChange(facility)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`facility-add-${facility}`}
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
            Thêm phòng
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddRoomModal;
