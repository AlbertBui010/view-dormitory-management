// import React, { useState, useEffect } from "react";
// import {
//   FaDownload,
//   FaCalendarAlt,
//   FaChartBar,
//   FaChartPie,
//   FaChartLine,
//   FaFilter,
//   FaUsers,
//   FaMoneyBillWave,
//   FaBuilding,
//   FaBed,
// } from "react-icons/fa";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement,
// } from "chart.js";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import Spinner from "../Spinner";
// import studentService from "../../services/admin/studentService";
// import dormitoryService from "../../services/admin/dormitoryService";
// import roomService from "../../services/admin/roomService";
// import paymentService from "../../services/admin/paymentService";
// import formatCurrency from "../../utils/formatCurrency";

// // Đăng ký các thành phần của Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   PointElement,
//   LineElement
// );

const Reports = () => {};
//   // States
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeReport, setActiveReport] = useState("overview");
//   const [timeRange, setTimeRange] = useState("thisYear");
//   const [statistics, setStatistics] = useState({
//     studentCount: 0,
//     roomCount: 0,
//     dormitoryCount: 0,
//     occupancyRate: 0,
//     totalRevenue: 0,
//     pendingPayments: 0,
//   });

//   // Data cho biểu đồ
//   const [chartData, setChartData] = useState({
//     // Sẽ cập nhật sau dựa vào loại báo cáo được chọn
//     labels: [],
//     datasets: [],
//   });

//   // Tải dữ liệu thống kê tổng quan
//   useEffect(() => {
//     const fetchStatistics = async () => {
//       setIsLoading(true);
//       try {
//         // Gọi các service để lấy dữ liệu
//         const students = await studentService.getAllStudents();
//         const dormitories = await dormitoryService.getAllDormitories();
//         const rooms = await roomService.getAllRooms();
//         const payments = await paymentService.getAllPayments();

//         // Tính toán các chỉ số thống kê
//         const studentCount = students.length;
//         const roomCount = rooms.length;
//         const dormitoryCount = dormitories.length;

//         // Tính tỷ lệ lấp đầy (số sinh viên / tổng số giường)
//         const totalBeds = rooms.reduce(
//           (total, room) => total + room.capacity,
//           0
//         );
//         const occupancyRate =
//           totalBeds > 0 ? (studentCount / totalBeds) * 100 : 0;

//         // Tính tổng doanh thu và thanh toán đang chờ xử lý
//         const totalRevenue = payments
//           .filter((payment) => payment.status === "completed")
//           .reduce((total, payment) => total + payment.amount, 0);

//         const pendingPayments = payments
//           .filter((payment) => payment.status === "pending")
//           .reduce((total, payment) => total + payment.amount, 0);

//         // Cập nhật state
//         setStatistics({
//           studentCount,
//           roomCount,
//           dormitoryCount,
//           occupancyRate: parseFloat(occupancyRate.toFixed(2)),
//           totalRevenue,
//           pendingPayments,
//         });

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching statistics:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchStatistics();
//   }, []);

//   // Cập nhật dữ liệu biểu đồ khi thay đổi loại báo cáo hoặc khoảng thời gian
//   useEffect(() => {
//     if (isLoading) return;

//     const updateChartData = async () => {
//       setIsLoading(true);
//       try {
//         // Báo cáo tổng quan - Phân bố sinh viên theo ký túc xá
//         if (activeReport === "overview") {
//           const dormitories = await dormitoryService.getAllDormitories();
//           const students = await studentService.getAllStudents();

//           // Tính số sinh viên cho mỗi ký túc xá
//           const studentsByDormitory = dormitories.map((dormitory) => {
//             return {
//               name: dormitory.name,
//               count: students.filter(
//                 (student) =>
//                   student.room && student.room.dormitory_id === dormitory.id
//               ).length,
//             };
//           });

//           setChartData({
//             labels: studentsByDormitory.map((item) => item.name),
//             datasets: [
//               {
//                 label: "Số sinh viên",
//                 data: studentsByDormitory.map((item) => item.count),
//                 backgroundColor: [
//                   "rgba(255, 99, 132, 0.7)",
//                   "rgba(54, 162, 235, 0.7)",
//                   "rgba(255, 206, 86, 0.7)",
//                   "rgba(75, 192, 192, 0.7)",
//                   "rgba(153, 102, 255, 0.7)",
//                 ],
//                 borderWidth: 1,
//               },
//             ],
//           });
//         }

//         // Báo cáo doanh thu
//         else if (activeReport === "revenue") {
//           const payments = await paymentService.getAllPayments();

//           // Lọc thanh toán theo khoảng thời gian
//           const filteredPayments = filterPaymentsByTimeRange(
//             payments,
//             timeRange
//           );

//           // Nhóm theo tháng cho báo cáo doanh thu
//           const revenueByMonth = groupPaymentsByMonth(filteredPayments);

//           setChartData({
//             labels: revenueByMonth.map((item) => item.month),
//             datasets: [
//               {
//                 label: "Doanh thu (VNĐ)",
//                 data: revenueByMonth.map((item) => item.revenue),
//                 backgroundColor: "rgba(75, 192, 192, 0.7)",
//                 borderColor: "rgba(75, 192, 192, 1)",
//                 borderWidth: 1,
//                 tension: 0.4,
//               },
//             ],
//           });
//         }

//         // Báo cáo tỷ lệ lấp đầy
//         else if (activeReport === "occupancy") {
//           const dormitories = await dormitoryService.getAllDormitories();
//           const rooms = await roomService.getAllRooms();
//           const students = await studentService.getAllStudents();

//           // Tính tỷ lệ lấp đầy cho mỗi ký túc xá
//           const occupancyByDormitory = dormitories.map((dormitory) => {
//             const dormitoryRooms = rooms.filter(
//               (room) => room.dormitory_id === dormitory.id
//             );
//             const totalCapacity = dormitoryRooms.reduce(
//               (total, room) => total + room.capacity,
//               0
//             );
//             const occupiedBeds = students.filter(
//               (student) =>
//                 student.room &&
//                 dormitoryRooms.some((room) => room.id === student.room.id)
//             ).length;

//             const occupancyRate =
//               totalCapacity > 0 ? (occupiedBeds / totalCapacity) * 100 : 0;

//             return {
//               name: dormitory.name,
//               occupancyRate: parseFloat(occupancyRate.toFixed(2)),
//             };
//           });

//           setChartData({
//             labels: occupancyByDormitory.map((item) => item.name),
//             datasets: [
//               {
//                 label: "Tỷ lệ lấp đầy (%)",
//                 data: occupancyByDormitory.map((item) => item.occupancyRate),
//                 backgroundColor: "rgba(54, 162, 235, 0.7)",
//                 borderColor: "rgba(54, 162, 235, 1)",
//                 borderWidth: 1,
//               },
//             ],
//           });
//         }

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error updating chart data:", error);
//         setIsLoading(false);
//       }
//     };

//     updateChartData();
//   }, [activeReport, timeRange]);

//   // Hàm phụ trợ để lọc các thanh toán theo khoảng thời gian
//   const filterPaymentsByTimeRange = (payments, range) => {
//     const today = new Date();
//     const startDate = new Date();

//     switch (range) {
//       case "thisMonth":
//         startDate.setDate(1); // Ngày đầu tiên của tháng hiện tại
//         break;
//       case "last3Months":
//         startDate.setMonth(today.getMonth() - 3);
//         break;
//       case "last6Months":
//         startDate.setMonth(today.getMonth() - 6);
//         break;
//       case "thisYear":
//         startDate.setMonth(0, 1); // Ngày 1 tháng 1 năm hiện tại
//         break;
//       default:
//         startDate.setFullYear(today.getFullYear() - 1); // Mặc định 1 năm
//     }

//     return payments.filter((payment) => {
//       const paymentDate = new Date(payment.payment_date);
//       return (
//         paymentDate >= startDate &&
//         paymentDate <= today &&
//         payment.status === "completed"
//       );
//     });
//   };

//   // Hàm phụ trợ để nhóm các thanh toán theo tháng
//   const groupPaymentsByMonth = (payments) => {
//     const months = [];
//     const monthNames = [
//       "Tháng 1",
//       "Tháng 2",
//       "Tháng 3",
//       "Tháng 4",
//       "Tháng 5",
//       "Tháng 6",
//       "Tháng 7",
//       "Tháng 8",
//       "Tháng 9",
//       "Tháng 10",
//       "Tháng 11",
//       "Tháng 12",
//     ];

//     // Tạo đối tượng theo dõi doanh thu mỗi tháng
//     const revenueByMonth = {};

//     payments.forEach((payment) => {
//       const date = new Date(payment.payment_date);
//       const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
//       if (!revenueByMonth[monthKey]) {
//         revenueByMonth[monthKey] = {
//           month: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
//           revenue: 0,
//           date, // Để sắp xếp
//         };
//       }
//       revenueByMonth[monthKey].revenue += payment.amount;
//     });

//     // Chuyển đổi thành mảng và sắp xếp theo thời gian
//     for (const key in revenueByMonth) {
//       months.push(revenueByMonth[key]);
//     }

//     return months.sort((a, b) => a.date - b.date);
//   };

//   // Tải xuống báo cáo
//   const downloadReport = () => {
//     alert(
//       "Tính năng đang được phát triển. Báo cáo sẽ được tải xuống dưới dạng file Excel."
//     );
//   };

//   // Config cho biểu đồ
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: getChartTitle(),
//         font: {
//           size: 16,
//         },
//       },
//     },
//   };

//   // Lấy tiêu đề biểu đồ tương ứng
//   function getChartTitle() {
//     switch (activeReport) {
//       case "overview":
//         return "Phân bố sinh viên theo ký túc xá";
//       case "revenue":
//         return "Doanh thu theo tháng";
//       case "occupancy":
//         return "Tỷ lệ lấp đầy theo ký túc xá";
//       default:
//         return "Báo cáo thống kê";
//     }
//   }

//   // Lấy loại biểu đồ tương ứng
//   const getChartComponent = () => {
//     switch (activeReport) {
//       case "overview":
//         return <Pie data={chartData} options={chartOptions} />;
//       case "revenue":
//         return <Line data={chartData} options={chartOptions} />;
//       case "occupancy":
//         return <Bar data={chartData} options={chartOptions} />;
//       default:
//         return <Bar data={chartData} options={chartOptions} />;
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Báo cáo thống kê</h1>
//         <p className="text-gray-600">
//           Xem báo cáo và thống kê tổng quan về hoạt động của ký túc xá
//         </p>
//       </div>

//       {/* Thẻ thống kê tổng quan */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <div className="rounded-full bg-blue-100 p-3 mr-4">
//             <FaUsers className="text-blue-600 text-xl" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Tổng số sinh viên</p>
//             <p className="text-2xl font-bold">{statistics.studentCount}</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <div className="rounded-full bg-green-100 p-3 mr-4">
//             <FaBed className="text-green-600 text-xl" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Tổng số phòng</p>
//             <p className="text-2xl font-bold">{statistics.roomCount}</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <div className="rounded-full bg-purple-100 p-3 mr-4">
//             <FaBuilding className="text-purple-600 text-xl" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Số lượng ký túc xá</p>
//             <p className="text-2xl font-bold">{statistics.dormitoryCount}</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <div className="rounded-full bg-yellow-100 p-3 mr-4">
//             <FaChartPie className="text-yellow-600 text-xl" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Tỷ lệ lấp đầy</p>
//             <p className="text-2xl font-bold">{statistics.occupancyRate}%</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <div className="rounded-full bg-teal-100 p-3 mr-4">
//             <FaMoneyBillWave className="text-teal-600 text-xl" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Tổng doanh thu</p>
//             <p className="text-2xl font-bold">
//               {formatCurrency(statistics.totalRevenue)}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-4 flex items-center">
//           <div className="rounded-full bg-red-100 p-3 mr-4">
//             <FaMoneyBillWave className="text-red-600 text-xl" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Thanh toán đang chờ xử lý</p>
//             <p className="text-2xl font-bold">
//               {formatCurrency(statistics.pendingPayments)}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Bộ lọc và công cụ báo cáo */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div className="flex flex-wrap items-center gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Loại báo cáo
//               </label>
//               <select
//                 value={activeReport}
//                 onChange={(e) => setActiveReport(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="overview">Tổng quan</option>
//                 <option value="revenue">Doanh thu</option>
//                 <option value="occupancy">Tỷ lệ lấp đầy</option>
//               </select>
//             </div>

//             {activeReport === "revenue" && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Khoảng thời gian
//                 </label>
//                 <select
//                   value={timeRange}
//                   onChange={(e) => setTimeRange(e.target.value)}
//                   className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="thisMonth">Tháng này</option>
//                   <option value="last3Months">3 tháng gần đây</option>
//                   <option value="last6Months">6 tháng gần đây</option>
//                   <option value="thisYear">Năm nay</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={downloadReport}
//             className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//           >
//             <FaDownload className="mr-2" /> Tải xuống báo cáo
//           </button>
//         </div>
//       </div>

//       {/* Biểu đồ */}
//       <div className="bg-white rounded-lg shadow p-4 mb-6">
//         {isLoading ? (
//           <div className="flex justify-center p-8">
//             <Spinner />
//           </div>
//         ) : (
//           <div className="h-96">{getChartComponent()}</div>
//         )}
//       </div>

//       {/* Mô tả báo cáo */}
//       <div className="bg-white rounded-lg shadow p-4">
//         <h2 className="text-lg font-bold mb-4">Thông tin báo cáo</h2>

//         {activeReport === "overview" && (
//           <div>
//             <p className="mb-2">
//               Báo cáo tổng quan thể hiện phân bố sinh viên theo từng ký túc xá:
//             </p>
//             <ul className="list-disc list-inside ml-4 text-gray-600">
//               <li>
//                 Hiển thị số lượng sinh viên đang lưu trú tại mỗi ký túc xá
//               </li>
//               <li>Giúp đánh giá mức độ phổ biến của các ký túc xá</li>
//               <li>Phân tích sự phân bố của sinh viên trong hệ thống</li>
//             </ul>
//           </div>
//         )}

//         {activeReport === "revenue" && (
//           <div>
//             <p className="mb-2">
//               Báo cáo doanh thu thể hiện doanh thu theo từng tháng:
//             </p>
//             <ul className="list-disc list-inside ml-4 text-gray-600">
//               <li>
//                 Hiển thị tổng doanh thu từ các khoản thanh toán đã hoàn thành
//               </li>
//               <li>Theo dõi xu hướng doanh thu qua các tháng</li>
//               <li>
//                 Xác định các tháng có doanh thu cao/thấp để lập kế hoạch tài
//                 chính
//               </li>
//             </ul>
//           </div>
//         )}

//         {activeReport === "occupancy" && (
//           <div>
//             <p className="mb-2">
//               Báo cáo tỷ lệ lấp đầy thể hiện tỷ lệ phần trăm giường đã có sinh
//               viên ở:
//             </p>
//             <ul className="list-disc list-inside ml-4 text-gray-600">
//               <li>So sánh tỷ lệ lấp đầy giữa các ký túc xá</li>
//               <li>
//                 Phát hiện các ký túc xá có tỷ lệ lấp đầy thấp để có biện pháp
//                 cải thiện
//               </li>
//               <li>
//                 Hỗ trợ lập kế hoạch phân bổ sinh viên và mở rộng quy mô nếu cần
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

export default Reports;
