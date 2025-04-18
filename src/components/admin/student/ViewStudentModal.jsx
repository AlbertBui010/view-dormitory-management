import React from "react";
import { FaUserGraduate, FaIdCard, FaBed } from "react-icons/fa";
import ModalLayout from "../ModalLayout";
import StatusBadge from "./StatusBadge";

const ViewStudentModal = ({ student, onClose, onEdit }) => {
  // Calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  return (
    <ModalLayout onClose={onClose}>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Thông tin chi tiết sinh viên
        </h3>
        <StatusBadge status={student.status} />
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-center">
          <div className="p-2 rounded-full bg-blue-100 text-blue-700">
            <FaUserGraduate className="h-20 w-20" />
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">{student.name}</h2>
          <p className="text-gray-600">
            {student.major} - {student.year}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center">
            <FaIdCard className="mr-2 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">MSSV</p>
              <p className="font-medium">{student.id}</p>
            </div>
          </div>

          <div className="flex items-center">
            <FaBed className="mr-2 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Phòng</p>
              <p className="font-medium">
                {student.roomAssigned || "Chưa phân phòng"}
              </p>
            </div>
          </div>

          <div className="col-span-2">
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium">{student.email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Số điện thoại</p>
            <p className="font-medium">{student.phone}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Ngày sinh</p>
            <p className="font-medium">
              {formatDate(student.dob)}
              <span className="text-xs text-gray-500 ml-1">
                ({calculateAge(student.dob)} tuổi)
              </span>
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Giới tính</p>
            <p className="font-medium">{student.gender}</p>
          </div>

          <div className="col-span-2">
            <p className="text-xs text-gray-500">Địa chỉ</p>
            <p className="font-medium">{student.address}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onClose}
          className="mr-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Đóng
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Chỉnh sửa
        </button>
      </div>
    </ModalLayout>
  );
};

export default ViewStudentModal;
