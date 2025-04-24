import React, { useState, useEffect } from "react";
import {
  FaBed,
  FaUserGraduate,
  FaClipboardList,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    totalStudents: 0,
    pendingBookings: 0,
    monthlyRevenue: 0,
    revenueChange: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // In a real application, you would fetch this data from your API
        // For now, we'll use mock data

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStats({
          totalRooms: 120,
          occupiedRooms: 98,
          totalStudents: 245,
          pendingBookings: 12,
          monthlyRevenue: 98500000,
          revenueChange: 12.5,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Mock data for charts
  const occupancyByBuilding = [
    { name: "Tòa A", value: 85 },
    { name: "Tòa B", value: 92 },
    { name: "Tòa C", value: 78 },
    { name: "Tòa D", value: 65 },
  ];

  const revenueData = [
    { month: "T1", revenue: 65000000 },
    { month: "T2", revenue: 75000000 },
    { month: "T3", revenue: 82000000 },
    { month: "T4", revenue: 98500000 },
    { month: "T5", revenue: 0 },
    { month: "T6", revenue: 0 },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Nguyễn Văn A đã đặt phòng",
      time: "10 phút trước",
      status: "pending",
    },
    {
      id: 2,
      action: "Trần Thị B đã thanh toán phí phòng",
      time: "30 phút trước",
      status: "success",
    },
    {
      id: 3,
      action: "Phòng A102 đã báo cáo sự cố",
      time: "1 giờ trước",
      status: "warning",
    },
    {
      id: 4,
      action: "Lê Văn C đã hủy đặt phòng",
      time: "2 giờ trước",
      status: "danger",
    },
    {
      id: 5,
      action: "Phạm Thị D đã chuyển phòng",
      time: "3 giờ trước",
      status: "info",
    },
  ];

  // Chart colors
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
        {/* Total Rooms Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Tổng số phòng</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.totalRooms}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Đã sử dụng: {stats.occupiedRooms} (
              {Math.round((stats.occupiedRooms / stats.totalRooms) * 100)}%)
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <FaBed className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        {/* Total Students Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Tổng sinh viên</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.totalStudents}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Đang ở: {stats.totalStudents} sinh viên
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <FaUserGraduate className="h-6 w-6 text-green-600" />
          </div>
        </div>

        {/* Pending Bookings Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Đơn đặt phòng</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {stats.pendingBookings}
            </p>
            <p className="text-sm text-gray-600 mt-1">Đang chờ xử lý</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <FaClipboardList className="h-6 w-6 text-yellow-600" />
          </div>
        </div>

        {/* Monthly Revenue Card */}
        <div className="bg-white rounded-lg shadow p-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Doanh thu tháng</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">
              {formatCurrency(stats.monthlyRevenue)}
            </p>
            <div className="flex items-center mt-1">
              {stats.revenueChange > 0 ? (
                <>
                  <FaArrowUp className="h-3 w-3 text-green-500 mr-1" />
                  <p className="text-sm text-green-500">
                    +{stats.revenueChange}% so với tháng trước
                  </p>
                </>
              ) : (
                <>
                  <FaArrowDown className="h-3 w-3 text-red-500 mr-1" />
                  <p className="text-sm text-red-500">
                    {stats.revenueChange}% so với tháng trước
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <FaMoneyBillWave className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Occupancy Rate by Building */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Tỷ lệ lấp đầy theo tòa nhà
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyByBuilding}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {occupancyByBuilding.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Tỷ lệ lấp đầy"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Doanh thu theo tháng
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                />
                <Legend />
                <Bar dataKey="revenue" name="Doanh thu" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Hoạt động gần đây
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-3 ${
                    activity.status === "pending"
                      ? "bg-blue-500"
                      : activity.status === "success"
                      ? "bg-green-500"
                      : activity.status === "warning"
                      ? "bg-yellow-500"
                      : activity.status === "danger"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                ></div>
                <p className="text-sm text-gray-700">{activity.action}</p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-gray-50 text-right">
          <button className="text-sm font-medium text-yellow-600 hover:text-yellow-800 transition-colors">
            Xem tất cả hoạt động
          </button>
        </div>
      </div>

      {/* Issues/Alerts */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="h-6 w-6 text-yellow-500 mr-3" />
          <h2 className="text-lg font-semibold text-gray-700">
            Cảnh báo cần chú ý
          </h2>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span>Phòng A102 báo cáo có sự cố về đường ống nước</span>
          </li>
          <li className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span>Tòa nhà B sắp đến hạn bảo trì định kỳ (5 ngày nữa)</span>
          </li>
          <li className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span>10 sinh viên chưa thanh toán phí tháng 4/2023</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
