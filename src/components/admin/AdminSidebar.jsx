import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBed,
  FaUserGraduate,
  FaClipboardList,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaHome,
  FaDoorOpen,
  FaBuilding,
} from "react-icons/fa";

const AdminSidebar = ({ isOpen }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admin") {
      // Exact match for dashboard
      return location.pathname === "/admin" || location.pathname === "/admin/";
    }
    // For other paths, check if the current path starts with the given path
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      path: "/admin",
      label: "Dashboard",
      icon: <FaTachometerAlt className="w-5 h-5" />,
    },
    {
      path: "/admin/dormitories",
      label: "Quản lý KTX",
      icon: <FaBuilding className="w-5 h-5" />,
    },
    {
      path: "/admin/rooms",
      label: "Quản lý phòng",
      icon: <FaBed className="w-5 h-5" />,
    },
    {
      path: "/admin/students",
      label: "Quản lý sinh viên",
      icon: <FaUserGraduate className="w-5 h-5" />,
    },
    {
      path: "/admin/room-allocation",
      label: "Phân bổ phòng",
      icon: <FaClipboardList className="w-5 h-5" />,
    },
    {
      path: "/admin/payments",
      label: "Thanh toán",
      icon: <FaMoneyBillWave className="w-5 h-5" />,
    },
    {
      path: "/admin/reports",
      label: "Báo cáo",
      icon: <FaChartBar className="w-5 h-5" />,
    },
    {
      path: "/admin/settings",
      label: "Cài đặt",
      icon: <FaCog className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className={`bg-black text-white fixed h-full transition-all duration-300 ease-in-out z-20 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo and app name */}
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <Link to="/admin" className="flex items-center">
          <FaDoorOpen className="h-8 w-8 text-yellow-500" />
          {isOpen && (
            <h1 className="ml-2 text-xl font-bold text-yellow-500">
              DORMANAGE
            </h1>
          )}
        </Link>
      </div>

      {/* Main navigation */}
      <nav className="mt-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="px-2 py-1">
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-yellow-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <span className="flex items-center justify-center">
                  {item.icon}
                </span>
                {isOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Back to site link */}
      <div className="absolute bottom-0 w-full px-2 py-4 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <FaHome className="w-5 h-5" />
          {isOpen && <span className="ml-3">Về trang chủ</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
