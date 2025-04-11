import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle, X } from "lucide-react";
import logo from "/img/logo.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <div className="w-full h-auto bg-zinc-900 z-40 shadow-md relative">
      {/* HEADER */}
      <div className="w-[80%] mx-auto flex items-center justify-between py-2">
        <img src={logo} alt="Logo" className="w-[125px] h-[125px]" />
        <h3 className="text-[32px] text-white font-bold">Dormanage.</h3>
        <div className="relative">
          <UserCircle
            className="text-white w-10 h-10 cursor-pointer hover:text-yellow-400 transition"
            onClick={toggleDropdown}
          />
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="w-full h-[100px] flex items-center justify-center">
        <ul className="w-[60%] flex justify-between text-lg font-bold text-white">
          {[
            { label: "Trang Chủ", to: "/" },
            { label: "Thông Tin Cá Nhân", to: "" },
            { label: "Lịch Sử Đặt Phòng", to: "" },
            { label: "Đăng Nhập", to: "/login" },
          ].map((item, index) => (
            <li key={index} className="relative group">
              <Link
                to={item.to}
                className="transition duration-300 group-hover:text-yellow-400"
              >
                {item.label}
              </Link>
              <span className="absolute left-0 -bottom-[35px] w-full h-[2px] bg-gradient-to-r from-yellow-500 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300"></span>
            </li>
          ))}
        </ul>
      </div>

      {/* DROPDOWN MENU */}
      <div>
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${
            dropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeDropdown}
        />

        {/* Slide-in panel */}
        <div
          className={`fixed top-0 right-0 h-full w-[300px] bg-white z-50 shadow-lg transform transition-transform duration-500 ${
            dropdownOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <span className="font-bold text-gray-800">Xin chào bạn</span>
            <X
              className="cursor-pointer text-gray-500 hover:text-red-500"
              onClick={closeDropdown}
            />
          </div>
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/login"
              className="block text-gray-800 hover:bg-gray-100 px-3 py-2 rounded"
              onClick={closeDropdown}
            >
              Đăng Nhập
            </Link>
            <Link
              to="/register"
              className="block text-gray-800 hover:bg-gray-100 px-3 py-2 rounded"
              onClick={closeDropdown}
            >
              Đăng Ký
            </Link>
            <hr />
            <button
              onClick={closeDropdown}
              className="block text-left w-full text-gray-800 hover:bg-gray-100 px-3 py-2 rounded"
            >
              Hỗ Trợ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
