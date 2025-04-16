import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaBell,
  FaSignOutAlt,
  FaCog,
  FaUserShield,
} from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import authService from "../../services/authService";

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      // If no user in localStorage, redirect to login
      navigate("/login");
    }

    // Dummy notifications for demo purposes
    setNotifications([
      {
        id: 1,
        message: "Yêu cầu đặt phòng mới từ Nguyễn Văn A",
        time: "10 phút trước",
        read: false,
      },
      {
        id: 2,
        message: "Báo cáo sự cố từ phòng B12",
        time: "1 giờ trước",
        read: false,
      },
      {
        id: 3,
        message: "Hóa đơn tháng 4 đã được cập nhật",
        time: "3 giờ trước",
        read: true,
      },
    ]);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get current page title
  const getPageTitle = () => {
    const path = location.pathname;

    if (path.includes("/admin/dashboard")) return "Tổng quan";
    if (path.includes("/admin/rooms")) return "Quản lý phòng";
    if (path.includes("/admin/students")) return "Quản lý sinh viên";
    if (path.includes("/admin/room-allocation")) return "Phân bổ phòng";
    if (path.includes("/admin/payments")) return "Thanh toán";
    if (path.includes("/admin/reports")) return "Báo cáo";
    if (path.includes("/admin/settings")) return "Cài đặt";

    return "Dashboard";
  };

  // Handle logout
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="px-4 py-3 flex justify-between items-center">
        {/* Left side - Hamburger menu and page title */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-yellow-500 focus:outline-none"
          >
            <HiMenu className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-gray-800">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right side - Notifications and user dropdown */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="text-gray-500 hover:text-yellow-500 focus:outline-none relative"
            >
              <FaBell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Thông báo
                  </h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <p className="text-sm text-gray-800">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      Không có thông báo mới
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <Link
                    to="/admin/notifications"
                    className="text-xs text-yellow-500 hover:text-yellow-700"
                  >
                    Xem tất cả thông báo
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-gray-700 hover:text-yellow-500 focus:outline-none"
            >
              <FaUserCircle className="h-8 w-8 text-gray-500" />
              <span className="ml-2 font-medium text-sm hidden md:block">
                {user?.name || "Admin"}
              </span>
            </button>

            {/* User dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
                <Link
                  to="/admin/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FaUserShield className="h-4 w-4 mr-2" />
                  Hồ sơ của tôi
                </Link>
                <Link
                  to="/admin/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FaCog className="h-4 w-4 mr-2" />
                  Cài đặt
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                >
                  <FaSignOutAlt className="h-4 w-4 mr-2" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
