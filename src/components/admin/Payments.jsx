import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaClock,
  FaMoneyBillWave,
  FaUniversity,
  FaMobileAlt,
  FaCreditCard,
  FaFileInvoice,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
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
import paymentService from "../../services/admin/paymentService";
import roomAllocationService from "../../services/admin/roomAllocationService";
import { useNavigate } from "react-router-dom";
import {
  paymentMethodLabels,
  paymentStatusLabels,
  roomAllocationStatus,
} from "../../constant/constants";

const Payments = () => {
  const navigate = useNavigate();

  // State declarations
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for rooms and students data
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);

  // State Active Allocaions
  const [activeAllocations, setActiveAllocations] = useState([]);

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
    payment_status: "UNPAID",
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
  // Fetch payments, rooms, students and active allocation data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Lấy dữ liệu phòng, sinh viên và phân phòng
        const roomsResponse = await roomService.getAllRooms();
        if (roomsResponse && roomsResponse?.status === 401) {
          navigate("/login");
        }
        const studentsResponse = await studentService.getAllStudents();
        const allocationsResponse =
          await roomAllocationService.getAllAllocations();

        // Lọc phân phòng đang hoạt động (DANGKY)
        const activeAllocationsData = allocationsResponse.filter(
          (allocation) => allocation.status === roomAllocationStatus.DANGKY
        );

        // Làm phong phú dữ liệu phân phòng với thông tin sinh viên và phòng
        const enrichedAllocations = activeAllocationsData.map((allocation) => {
          const student = studentsResponse.find(
            (s) => s.id === allocation.student_id
          );
          const room = roomsResponse.find((r) => r.id === allocation.room_id);
          return {
            ...allocation,
            student,
            room,
          };
        });

        // Lưu lại phòng, sinh viên và phân phòng
        setRooms(roomsResponse);
        setStudents(studentsResponse);
        setActiveAllocations(enrichedAllocations);

        // Lấy dữ liệu thanh toán
        const paymentsResponse = await paymentService.getAllPayments();

        // Xử lý dữ liệu thanh toán
        if (paymentsResponse && Array.isArray(paymentsResponse)) {
          // // Làm phong phú dữ liệu thanh toán với thông tin phân phòng, sinh viên và phòng
          // const enrichedPayments = paymentsResponse.map((payment) => {
          //   const allocation = payment.roomAllocation;
          //   return {
          //     ...payment,
          //     student: allocation?.student || {},
          //     room: allocation?.room || {},
          //   };
          // });

          setPayments(paymentsResponse);
          setFilteredPayments(paymentsResponse);

          // Tính toán thống kê
          calculateStats(paymentsResponse);
        } else {
          setPayments([]);
          setFilteredPayments([]);
          setStats({
            totalPayments: 0,
            totalPaid: 0,
            totalPending: 0,
            totalAmount: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hàm tính toán thống kê
  const calculateStats = (payments) => {
    if (!Array.isArray(payments)) return;

    const totalAmount = payments.reduce(
      (sum, payment) =>
        payment.payment_status === "PAID"
          ? sum + parseFloat(payment.amount)
          : sum,
      0
    );

    console.log("PAY:::", payments);

    setStats({
      totalPayments: payments.length,
      totalPaid: payments.filter((payment) => payment.payment_status === "PAID")
        .length,
      totalPending: payments.filter(
        (payment) => payment.payment_status === "UNPAID"
      ).length,
      totalAmount,
    });
  };

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

  // Reset form data
  const resetFormData = () => {
    setFormData({
      room_allocation_id: "",
      amount: "",
      payment_date: new Date(),
      payment_status: paymentStatusLabels.UNPAID,
      payment_method: paymentMethodLabels.CASH,
      notes: "",
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
    // setFormData({
    //   id: payment.id,
    //   student_id: payment.student_id,
    //   room_id: payment.room_id,
    //   amount: payment.amount,
    //   payment_date: new Date(payment.payment_date),
    //   payment_status: payment.payment_status,
    //   payment_method: payment.payment_method,
    //   notes: payment.notes || "",
    // });
    setFormData(payment);
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

  // Create payment
  const handleAddPayment = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Format date
      const formattedDate = formData.payment_date.toISOString().split("T")[0];

      const paymentData = {
        room_allocation_id: parseInt(formData.room_allocation_id),
        amount: parseFloat(formData.amount),
        payment_date: formattedDate,
        payment_status: formData.payment_status,
        payment_method: formData.payment_method,
        notes: formData.notes || "",
      };

      // Sử dụng service để tạo thanh toán mới
      const response = await paymentService.createPayment(paymentData);

      // Tìm phân phòng tương ứng
      const allocation = activeAllocations.find(
        (a) => a.id === parseInt(formData.room_allocation_id)
      );

      if (allocation) {
        // Làm phong phú dữ liệu thanh toán
        const enrichedPayment = {
          ...response,
          roomAllocation: allocation,
          student: allocation.student,
          room: allocation.room,
        };

        // Cập nhật state
        setPayments((prevPayments) => [...prevPayments, enrichedPayment]);
        setFilteredPayments((prevFilteredPayments) => [
          ...prevFilteredPayments,
          enrichedPayment,
        ]);

        // Cập nhật thống kê
        calculateStats([...payments, enrichedPayment]);

        // Đóng modal và thông báo
        setShowAddModal(false);
        resetFormData();
        toast.success("Thêm khoản thanh toán thành công");
      } else {
        toast.error("Không tìm thấy thông tin phân phòng");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error(
        error.response?.data?.message || "Không thể thêm khoản thanh toán"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Update payment
  const handleUpdatePayment = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const updateData = {
        amount: parseFloat(formData.amount),
        payment_date: new Date(formData.payment_date),
        payment_status: formData.payment_status,
        payment_method: formData.payment_method,
        notes: formData.notes || "",
      };
      console.log(" handleUpdatePayment ~ updateData:", updateData);

      // Sử dụng service mới
      const response = await paymentService.updatePayment(
        selectedPayment.id,
        updateData
      );

      // Cập nhật state
      const updatedPayments = payments.map((payment) =>
        payment.id === selectedPayment.id
          ? { ...payment, ...response }
          : payment
      );

      setPayments(updatedPayments);
      setFilteredPayments(
        filteredPayments.map((payment) =>
          payment.id === selectedPayment.id
            ? { ...payment, ...response }
            : payment
        )
      );

      // Đóng modal và thông báo
      setShowEditModal(false);
      resetFormData();
      toast.success("Cập nhật khoản thanh toán thành công");
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error(error.message || "Không thể cập nhật khoản thanh toán");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete payment
  const handleDeletePayment = async () => {
    try {
      setIsLoading(true);

      // Sử dụng service mới
      await paymentService.deletePayment(selectedPayment.id);

      // Cập nhật state
      setPayments(
        payments.filter((payment) => payment.id !== selectedPayment.id)
      );
      setFilteredPayments(
        filteredPayments.filter((payment) => payment.id !== selectedPayment.id)
      );

      // Đóng modal và thông báo
      setShowDeleteModal(false);
      toast.success("Xóa khoản thanh toán thành công");
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error(error.message || "Không thể xóa khoản thanh toán");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsPaid = async (payment) => {
    try {
      setIsLoading(true);

      const updatedPayment = {
        ...payment,
        payment_status: paymentStatusLabels.PAID,
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

      const updatedPayment = {
        ...payment,
        payment_status: paymentStatusLabels.OVERDUE,
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
        allocations={activeAllocations}
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
