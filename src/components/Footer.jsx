import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full mt-[200px] p-10">
      <div className=" w-[80%] m-auto grid grid-cols-3 gap-12 text-center">
        {/* Cột SẢN PHẨM */}
        <div>
          <h3 className="font-bold uppercase mb-3">IFORMATION NHÓM 10</h3>
          <p>Phạm Quốc Thái - DH52100604 - D21_TH04</p>
          <p>Bùi Quang Quý - DH52100604 - D21_TH04</p>
          <p>Trần Quốc Nam - DH52100604 - D21_TH04</p>
          <p>Trịnh Gia Đạt - DH52100604 - D21_TH04</p>
          <p>Nguyễn Đình Thông - DH52100604 - D21_TH04</p>
        </div>

        {/* Cột THỂ THAO */}
        <div>
          <h3 className="font-bold uppercase mb-3">Xây Dựng Website</h3>
          <p>Tên Đề Tài: Xây Dựng Website Quản Lý Ký Túc Xá</p>
        </div>


    

        {/* Cột THÔNG TIN VỀ CÔNG TY */}
        <div className="flex flex-col items-center">
          <h3 className="font-bold uppercase mb-3">Social Account</h3>
          <div className="space-y-2 text-white text-2xl">
          <FaFacebook className="hover:text-blue-500 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaTiktok className="hover:text-purple-600 cursor-pointer" />
          <FaYoutube className="hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
  
    </footer>
  )
}

export default Footer