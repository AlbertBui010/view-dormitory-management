import React from "react";
import { useParams } from "react-router-dom";
import { rooms } from "../constant/data";

const DetailRoom = () => {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === parseInt(id));

  if (!room) return <p className="text-center mt-10">Không tìm thấy phòng</p>;

  return (
    <div className="w-full min-h-screen mt-10">
      <div className="w-[80%] mx-auto">
      <h2 className="text-3xl font-bold  text-black uppercase mb-6">
              Chi tiết phòng
            </h2>
        <div className="flex">
          <div className="">
            <img
              src={room.img}
              alt={room.room_number}
              className="w-[800px] h-[400px] object-cover rounded-xl mb-6 "
            />
          </div>

          <div className="p-10 space-y-5">
            <h2 className="text-3xl font-bold  text-amber-700 mb-6">
              {room.room_number}
            </h2>
            <p>
              Loại phòng: <span>{room.room_type}</span>
            </p>
            <p className="">
              Sức chứa: <span>{room.capacity}</span>
            </p>
            <p>
              Hiện tại: <span>{room.current_occupancy}</span>
            </p>
            <p>
              Trạng thái: <span>{room.status}</span>
            </p>
            <p>
              Giá: <span>{room.price}VND/Tháng</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRoom;
