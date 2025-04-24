import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { rooms, dormitories } from "../constant/data"; // import từ file data tĩnh
import { useNavigate } from "react-router-dom"; // thêm

const DormitoryRoomsSlider = () => {
  const [activeDorm, setActiveDorm] = useState(dormitories[0]);
  const navigate = useNavigate(); // khởi tạo
  const filteredRooms = rooms.filter(
    (room) => room.dormitory_id === activeDorm.id
  );

  return (
    <section className="w-[85%] mx-auto py-6 bg-gray-100y-100 min-h-screen shadow-2xl border border-gray-200 mt-[100px]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-700 mb-10 uppercase">
          Danh Sách Các Phòng Của Ký Túc Xá
        </h2>

        <div className="flex justify-center gap-4 mb-8">
          {dormitories.map((dorm) => {
            const isActive = activeDorm.id === dorm.id;
            const activeBgColor =
              dorm.name === "KTX Nam"
                ? "bg-blue-700 text-white"
                : "bg-pink-400 text-white";
            return (
              <button
                key={dorm.id}
                onClick={() => setActiveDorm(dorm)}
                className={`w-full h-[50px] rounded-3xl text-lg font-semibold transition duration-300 ${
                  isActive
                    ? activeBgColor
                    : "bg-black text-white transition transform duration-300 hover:translate-y-1"
                }`}
              >
                {dorm.name}
              </button>
            );
          })}
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {filteredRooms.map((room) => (
            <SwiperSlide key={room.id}>
              <div
                className="relative h-auto bg-zinc-200 rounded-xl shadow-xl transition duration-300 hover:scale-95 cursor-pointer overflow-hidden group"
                onClick={() => navigate(`/detail/${room.id}`)}
              >
                {/* Ảnh */}
                <img
                  src={room.img}
                  alt={room.room_number}
                  className="w-full h-[350px] object-cover"
                />

                {/* Lớp overlay đen mờ khi hover */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                {/* Nút đăng ký */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <button
                    className="bg-yellow-500 text-white font-bold px-6 py-2 rounded-full shadow-lg transition transform duration-300 hover:bg-yellow-700"
                    onClick={(e) => {
                      e.stopPropagation(); // ngăn sự kiện lan xuống slide
                      navigate(`/detail/${room.id}`);
                    }}
                  >
                    Đăng ký ngay
                  </button>
                </div>

                {/* Thông tin phòng */}
                <div className="p-4 relative z-30">
                  <h3 className="text-xl font-bold text-yellow-700 text-center">
                    {room.room_number}
                  </h3>
                  <div className="flex mt-2 items-center justify-between">
                    <p className="text-base">Loại Phòng:</p>
                    <p className="text-gray-600">{room.room_type}</p>
                  </div>
                  <div className="flex mt-2 items-center justify-between">
                    <p className="text-base">Size Phòng:</p>
                    <p className="text-gray-600">
                      Sức chứa: {room.capacity} | Hiện tại:{" "}
                      {room.current_occupancy}
                    </p>
                  </div>
                  <div className="flex mt-2 items-center justify-between">
                    <p className="text-base">Trạng Thái:</p>
                    <p
                      className={`font-semibold ${
                        room.status === "Còn Phòng"
                          ? "text-lime-700"
                          : "text-red-600"
                      }`}
                    >
                      {room.status}
                    </p>
                  </div>
                  <div className="flex mt-2 items-center justify-between">
                    <p className="text-base">Giá:</p>
                    <p className="text-end text-lg font-bold">
                      {room.price} VND{" "}
                      <span className="text-sm font-normal">/Tháng</span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DormitoryRoomsSlider;
