import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
const navigate = useNavigate();

  return (
    <div>
      <div className="w-full h-screen flex bg-white">
        {/* Bên phải form */}
        <div className=" w-[30%] h-auto flex flex-col p-20 bg-white mx-auto my-10 border border-transparent rounded-2xl shadow-2xl ">
          <h1 className="text-[32px] uppercase font-bold text-yellow-500 text-center font-poppins">
            DORMANAGE
          </h1>
          <p className="text-center text-yellow-700">Dormitory Manage</p>

          {/* Form Login */}
          <div className="mt-8">
            <h3 className="text-3xl font-semibold mb-4 text-center">Đăng Ký</h3>
            <p className="text-sm mb-4">
              Vui lòng điền thông tin chính xác để đăng ký tài khoản.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full p-3  bg-gray-100 rounded-[50px] shadow-xl border border-gray-300"              />
              <input
                type="text"
                placeholder="Email"
                className="w-full p-3  bg-gray-100 rounded-[50px] shadow-xl border border-gray-300"  
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full p-3  bg-gray-100 rounded-[50px] shadow-xl border border-gray-300"              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3  bg-gray-100 rounded-[50px] shadow-xl border border-gray-300"
              />
              <select className="w-full p-3  bg-gray-100 text-black rounded-[50px] shadow-2xl border border-gray-300">
                <option value="" disabled hidden>
                  Chọn giới tính
                </option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>


            {/* Nút hành động */}
            <div className="flex space-y-4 space-x-4 mt-8 items-end justify-end">
              <button className="w-[30%] py-4 bg-black text-white font-semibold rounded-md hover:bg-yellow-500 hover:text-black transition transform duration-300 ">
                Đăng Ký
              </button>
            </div>

            <div className="w-full flex justify-center mt-4">
              <p className="text-sm">
                Bạn đã có tài khoản?{" "}
                <span className="font-semibold underline cursor-pointer"
                onClick={() => navigate('/login')}>
                 Đăng nhập ngay
                </span>
              </p>
            </div>
            <div className="w-full flex justify-center mt-4">
              <Link to="/" className="font-bold underline">
                Quay Lại
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
