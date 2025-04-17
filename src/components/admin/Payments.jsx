import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaTimes,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEye,
  FaPrint,
  FaEdit,
  FaTrash,
  FaCheck,
  FaClock,
  FaSave,
  FaMoneyBillWave,
  FaUniversity,
  FaMobileAlt,
  FaCreditCard,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaFileInvoice,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DashboardCard from "./payment/DashboardCard";
import PaymentFilters from "./payment/PaymentFilters";
import PaymentTable from "./payment/PaymentTable";
import Pagination from "./payment/Pagination";
import AddPaymentModal from "./payment/AddPaymentModal";
import EditPaymentModal from "./payment/EditPaymentModal";
import DeletePaymentModal from "./payment/DeletePaymentModal";
import ViewPaymentModal from "./payment/ViewPaymentModal";
import ReceiptModal from "./payment/ReceiptModal";
import api from "../../api";
import Spinner from "../Spinner";
import EmptyState from "../EmptyState";
import StatusBadge from "./payment/StatusBadge";

import roomService from "../../services/admin/roomService";
import studentService from "../../services/admin/studentService";

// Status Badge component
// const StatusBadge = ({ status }) => {
//   switch (status) {
//     case "paid":
//       return (
//         <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium">
//           Đã thanh toán
//         </span>
//       );
//     case "pending":
//       return (
//         <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 font-medium">
//           Chờ thanh toán
//         </span>
//       );
//     case "overdue":
//       return (
//         <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 font-medium">
//           Quá hạn
//         </span>
//       );
//     case "cancelled":
//       return (
//         <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 font-medium">
//           Đã hủy
//         </span>
//       );
//     default:
//       return (
//         <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 font-medium">
//           {status}
//         </span>
//       );
//   }
// };

const Payments = () => {
  // State declarations
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for rooms and students data
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentRoomMap, setStudentRoomMap] = useState({});

  // State for dashboard stats
  const [stats, setStats] = useState({
    totalPayments: 0,
    totalPaid: 0,
    totalPending: 0,
    totalAmount: 0,
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10);

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // State for selected payment
  const [selectedPayment, setSelectedPayment] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    student_id: "",
    room_id: "",
    amount: "",
    payment_date: new Date(),
    payment_status: "PENDING",
    payment_method: "CASH",
    notes: "",
  });

  // State for filters
  const [filters, setFilters] = useState({
    studentId: "",
    roomId: "",
    status: "",
    dateRange: [null, null],
  });

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: "payment_date",
    direction: "descending",
  });

  // Effects
  // Fetch payments, rooms, and students data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be API calls
        // const roomsResponse = await api.get("/rooms");
        const roomsResponse = await roomService.getAllRooms();
        const studentsResponse = await studentService.getAllStudents();
        const paymentsResponse = await api.get("/payments");

        // For demonstration purposes, using setTimeout to simulate API delay
        setTimeout(() => {
          setRooms(roomsResponse);
          setStudents(studentsResponse);

          // Enrich payment data with student and room info
          const enrichedPayments = paymentsResponse.data.map((payment) => ({
            ...payment,
            student: studentsResponse.find((s) => s.id === payment.student_id),
            room: roomsResponse.find((r) => r.id === payment.room_id),
          }));

          setPayments(enrichedPayments);
          setFilteredPayments(enrichedPayments);

          // Calculate student-room mapping
          const studentRoomMapping = {};
          enrichedPayments.forEach((payment) => {
            if (
              payment.payment_status === "paid" ||
              payment.payment_status === "pending"
            ) {
              studentRoomMapping[payment.student_id] = payment.room_id;
            }
          });
          setStudentRoomMap(studentRoomMapping);

          // Calculate stats
          const totalAmount = enrichedPayments.reduce(
            (sum, payment) =>
              payment.payment_status === "paid"
                ? sum + parseFloat(payment.amount)
                : sum,
            0
          );

          setStats({
            totalPayments: enrichedPayments.length,
            totalPaid: enrichedPayments.filter(
              (payment) => payment.payment_status === "paid"
            ).length,
            totalPending: enrichedPayments.filter(
              (payment) => payment.payment_status === "pending"
            ).length,
            totalAmount: totalAmount,
          });

          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Không thể tải dữ liệu thanh toán. Vui lòng thử lại sau.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters, search and sort
  useEffect(() => {
    let result = [...payments];

    // Apply student filter
    if (filters.studentId) {
      result = result.filter(
        (payment) => payment.student_id === filters.studentId
      );
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(
        (payment) => payment.payment_status === filters.status
      );
    }

    // Apply date range filter
    if (filters.dateRange[0] && filters.dateRange[1]) {
      const startDate = new Date(filters.dateRange[0]);
      const endDate = new Date(filters.dateRange[1]);
      endDate.setHours(23, 59, 59, 999); // Include the end date fully

      result = result.filter((payment) => {
        const paymentDate = new Date(payment.payment_date);
        return paymentDate >= startDate && paymentDate <= endDate;
      });
    }

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (payment) =>
          payment.student?.fullName?.toLowerCase().includes(search) ||
          payment.student?.id?.toLowerCase().includes(search) ||
          payment.id?.toString().includes(search) ||
          payment.room?.room_number?.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue, bValue;

        // Handle special cases for nested properties
        if (sortConfig.key === "student") {
          aValue = a.student?.fullName?.toLowerCase() || "";
          bValue = b.student?.fullName?.toLowerCase() || "";
        } else if (sortConfig.key === "room") {
          aValue = a.room?.room_number?.toLowerCase() || "";
          bValue = b.room?.room_number?.toLowerCase() || "";
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];

          // Handle date comparison
          if (sortConfig.key === "payment_date") {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
          }

          // Handle number comparison
          if (sortConfig.key === "amount") {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
          }
        }

        // Compare values
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredPayments(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, searchTerm, sortConfig, payments]);

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      payment_date: date,
    });
  };

  const resetFormData = () => {
    setFormData({
      student_id: "",
      room_id: "",
      amount: "",
      payment_date: new Date(),
      payment_status: "pending",
      payment_method: "cash",
      notes: "",
      created_by: "admin",
      updated_by: null,
    });
  };

  const resetFilters = () => {
    setFilters({
      studentId: "",
      roomId: "",
      status: "",
      dateRange: [null, null],
    });
    setSearchTerm("");
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const openAddModal = () => {
    resetFormData();
    setShowAddModal(true);
  };

  const openEditModal = (payment) => {
    setSelectedPayment(payment);
    setFormData({
      id: payment.id,
      student_id: payment.student_id,
      room_id: payment.room_id,
      amount: payment.amount,
      payment_date: new Date(payment.payment_date),
      payment_status: payment.payment_status,
      payment_method: payment.payment_method,
      notes: payment.notes || "",
      created_by: payment.created_by,
      updated_by: "admin", // Current user would come from auth context
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (payment) => {
    setSelectedPayment(payment);
    setShowDeleteModal(true);
  };

  const openViewModal = (payment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  const openReceiptModal = (payment) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // In a real app, this would be an API call
      const response = await api.post("/payments", formData);

      // Enrich the new payment with student and room info
      const newPayment = {
        ...response.data,
        student: students.find((s) => s.id === formData.student_id),
        room: rooms.find((r) => r.id === formData.room_id),
      };

      setPayments([...payments, newPayment]);

      setShowAddModal(false);
      resetFormData();

      toast.success("Khoản thu đã được thêm thành công!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error adding payment:", error);
      toast.error("Không thể thêm khoản thu. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // In a real app, this would be an API call
      const response = await api.put(`/payments/${formData.id}`, formData);

      // Update the payments array
      const updatedPayments = payments.map((payment) => {
        if (payment.id === formData.id) {
          return {
            ...response.data,
            student: students.find((s) => s.id === formData.student_id),
            room: rooms.find((r) => r.id === formData.room_id),
          };
        }
        return payment;
      });

      setPayments(updatedPayments);

      setShowEditModal(false);
      resetFormData();

      toast.success("Khoản thu đã được cập nhật thành công!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Không thể cập nhật khoản thu. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  const handleDeletePayment = async () => {
    try {
      setIsLoading(true);

      // In a real app, this would be an API call
      await api.delete(`/payments/${selectedPayment.id}`);

      // Update the payments array
      const updatedPayments = payments.filter(
        (payment) => payment.id !== selectedPayment.id
      );

      setPayments(updatedPayments);

      setShowDeleteModal(false);
      setSelectedPayment(null);

      toast.success("Khoản thu đã được xóa thành công!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("Không thể xóa khoản thu. Vui lòng thử lại sau.");
      setIsLoading(false);
    }
  };

  const markAsPaid = async (payment) => {
    try {
      setIsLoading(true);

      // In a real app, this would be an API call
      const updatedPayment = {
        ...payment,
        payment_status: "paid",
        updated_by: "admin", // Current user would come from auth context
      };

      const response = await api.put(`/payments/${payment.id}`, updatedPayment);

      // Update the payments array
      const updatedPayments = payments.map((p) => {
        if (p.id === payment.id) {
          return {
            ...response.data,
            student: p.student,
            room: p.room,
          };
        }
        return p;
      });

      setPayments(updatedPayments);

      toast.success(
        "Khoản thu đã được cập nhật thành trạng thái Đã thanh toán!"
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error marking payment as paid:", error);
      toast.error(
        "Không thể cập nhật trạng thái khoản thu. Vui lòng thử lại sau."
      );
      setIsLoading(false);
    }
  };

  const markAsOverdue = async (payment) => {
    try {
      setIsLoading(true);

      // In a real app, this would be an API call
      const updatedPayment = {
        ...payment,
        payment_status: "overdue",
        updated_by: "admin", // Current user would come from auth context
      };

      const response = await api.put(`/payments/${payment.id}`, updatedPayment);

      // Update the payments array
      const updatedPayments = payments.map((p) => {
        if (p.id === payment.id) {
          return {
            ...response.data,
            student: p.student,
            room: p.room,
          };
        }
        return p;
      });

      setPayments(updatedPayments);

      toast.success("Khoản thu đã được cập nhật thành trạng thái Quá hạn!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error marking payment as overdue:", error);
      toast.error(
        "Không thể cập nhật trạng thái khoản thu. Vui lòng thử lại sau."
      );
      setIsLoading(false);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const printReceipt = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Generate receipt HTML
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Biên lai thanh toán</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .receipt { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
            .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .amount { font-size: 20px; font-weight: bold; color: #0047AB; }
            .footer { margin-top: 40px; text-align: center; font-size: 14px; color: #666; }
            .signature { margin-top: 60px; display: flex; justify-content: space-between; }
            .signature-line { width: 40%; text-align: center; }
            .signature-box { border-top: 1px solid #000; padding-top: 5px; margin-top: 40px; }
            @media print {
              body { margin: 0; }
              .receipt { border: none; }
              .print-btn { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1>BIÊN LAI THANH TOÁN</h1>
              <p>Mã hóa đơn: ${generateInvoiceNumber(selectedPayment)}</p>
              <p>Ngày: ${formatDate(selectedPayment.payment_date)}</p>
            </div>
            
            <div class="info-row">
              <span>Sinh viên:</span>
              <span>${selectedPayment.student.fullName} (${
      selectedPayment.student.id
    })</span>
            </div>
            
            <div class="info-row">
              <span>Phòng:</span>
              <span>${selectedPayment.room.room_number} (Tòa ${
      selectedPayment.room.building
    })</span>
            </div>
            
            <div class="info-row">
              <span>Mô tả:</span>
              <span>Thanh toán tiền phòng ký túc xá</span>
            </div>
            
            <div class="info-row">
              <span>Phương thức thanh toán:</span>
              <span>${getPaymentMethodText(
                selectedPayment.payment_method
              )}</span>
            </div>
            
            <hr />
            
            <div class="info-row">
              <span>Tổng tiền:</span>
              <span class="amount">${formatCurrency(
                selectedPayment.amount
              )}</span>
            </div>
            
            <div class="signature">
              <div class="signature-line">
                <div class="signature-box">Người thu tiền</div>
              </div>
              <div class="signature-line">
                <div class="signature-box">Người nộp tiền</div>
              </div>
            </div>
            
            <div class="footer">
              <p>Biên lai này là bằng chứng thanh toán chính thức. Vui lòng giữ lại để tham khảo trong tương lai.</p>
              <p>© ${new Date().getFullYear()} Ký túc xá Trường Đại học</p>
            </div>
          </div>
          
          <div class="print-btn" style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()">In biên lai</button>
          </div>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Auto print
    printWindow.onload = function () {
      printWindow.print();
    };
  };

  // Helper functions
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case "cash":
        return "Tiền mặt";
      case "bank_transfer":
        return "Chuyển khoản";
      case "momo":
        return "Ví Momo";
      default:
        return method;
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "cash":
        return <FaMoneyBillWave className="h-4 w-4 text-green-600" />;
      case "bank_transfer":
        return <FaUniversity className="h-4 w-4 text-blue-600" />;
      case "momo":
        return <FaMobileAlt className="h-4 w-4 text-pink-600" />;
      default:
        return <FaCreditCard className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    return <StatusBadge status={status} />;
  };

  const generateInvoiceNumber = (payment) => {
    // Generate invoice number based on payment ID and date
    const paymentDate = new Date(payment.payment_date);
    const year = paymentDate.getFullYear().toString().substr(-2);
    const month = (paymentDate.getMonth() + 1).toString().padStart(2, "0");
    return `INV-${year}${month}-${payment.id.toString().padStart(4, "0")}`;
  };

  // Get current payments for pagination
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý khoản thu</h1>
        <p className="text-gray-600">
          Quản lý và theo dõi các khoản thanh toán của sinh viên
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard
          title="Tổng số khoản thu"
          value={stats.totalPayments}
          icon={<FaFileInvoice className="h-6 w-6 text-indigo-600" />}
          color={{ bg: "bg-indigo-50", text: "text-indigo-600" }}
        />
        <DashboardCard
          title="Đã thanh toán"
          value={stats.totalPaid}
          icon={<FaCheckCircle className="h-6 w-6 text-green-600" />}
          color={{ bg: "bg-green-50", text: "text-green-600" }}
        />
        <DashboardCard
          title="Chờ thanh toán"
          value={stats.totalPending}
          icon={<FaClock className="h-6 w-6 text-yellow-600" />}
          color={{ bg: "bg-yellow-50", text: "text-yellow-600" }}
        />
        <DashboardCard
          title="Tổng thu"
          value={formatCurrency(stats.totalAmount)}
          icon={<FaMoneyBillWave className="h-6 w-6 text-blue-600" />}
          color={{ bg: "bg-blue-50", text: "text-blue-600" }}
        />
      </div>

      {/* Action Button */}
      <div className="mb-6">
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" />
          Thêm khoản thu mới
        </button>
      </div>

      {/* Filters */}
      <PaymentFilters
        filters={filters}
        setFilters={setFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        rooms={rooms}
        students={students}
        resetFilters={resetFilters}
      />

      {/* Payment Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Spinner />
          </div>
        ) : filteredPayments.length === 0 ? (
          <EmptyState
            icon={<FaMoneyBillWave className="h-12 w-12 text-gray-400" />}
            title="Không tìm thấy khoản thu nào"
            description="Không có khoản thu nào phù hợp với điều kiện tìm kiếm hoặc lọc của bạn."
          />
        ) : (
          <>
            <PaymentTable
              payments={currentPayments}
              sortConfig={sortConfig}
              requestSort={requestSort}
              openViewModal={openViewModal}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
              openReceiptModal={openReceiptModal}
              markAsPaid={markAsPaid}
              markAsOverdue={markAsOverdue}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
              getPaymentMethodText={getPaymentMethodText}
              getStatusBadge={getStatusBadge}
            />

            <Pagination
              currentPage={currentPage}
              totalItems={filteredPayments.length}
              itemsPerPage={paymentsPerPage}
              paginate={paginate}
            />
          </>
        )}
      </div>

      {/* Modals */}
      <AddPaymentModal
        showAddModal={showAddModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        handleAddPayment={handleAddPayment}
        resetFormData={resetFormData}
        setShowAddModal={setShowAddModal}
        rooms={rooms}
        students={students}
        studentRoomMap={studentRoomMap}
      />

      <EditPaymentModal
        showEditModal={showEditModal}
        selectedPayment={selectedPayment}
        formData={formData}
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        handleUpdatePayment={handleUpdatePayment}
        resetFormData={resetFormData}
        setShowEditModal={setShowEditModal}
        rooms={rooms}
        students={students}
      />

      <DeletePaymentModal
        showDeleteModal={showDeleteModal}
        selectedPayment={selectedPayment}
        handleDeletePayment={handleDeletePayment}
        setShowDeleteModal={setShowDeleteModal}
        formatCurrency={formatCurrency}
      />

      <ViewPaymentModal
        showViewModal={showViewModal}
        selectedPayment={selectedPayment}
        setShowViewModal={setShowViewModal}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
        generateInvoiceNumber={generateInvoiceNumber}
        getPaymentMethodIcon={getPaymentMethodIcon}
        getPaymentMethodText={getPaymentMethodText}
        getStatusBadge={getStatusBadge}
        printReceipt={printReceipt}
      />

      <ReceiptModal
        showReceiptModal={showReceiptModal}
        selectedPayment={selectedPayment}
        setShowReceiptModal={setShowReceiptModal}
        formatDate={formatDate}
        formatCurrency={formatCurrency}
        generateInvoiceNumber={generateInvoiceNumber}
        getPaymentMethodText={getPaymentMethodText}
        printReceipt={printReceipt}
      />
    </div>
  );
};

export default Payments;
