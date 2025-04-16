import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaEye,
  FaBed,
  FaUserGraduate,
  FaIdCard,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Students = () => {
  // State for students data
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // State for selected student
  const [selectedStudent, setSelectedStudent] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    studentId: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    major: "",
    year: "",
    status: "active",
  });

  // State for filters
  const [filters, setFilters] = useState({
    gender: "",
    major: "",
    year: "",
    status: "",
  });

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: "fullName",
    direction: "ascending",
  });

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch this data from your API
        // Example: const response = await studentService.getAllStudents();

        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockStudents = [
          {
            id: 1,
            studentId: "SV001",
            fullName: "Nguyễn Văn An",
            email: "an.nguyen@example.com",
            phoneNumber: "0912345678",
            dateOfBirth: "2000-05-15",
            gender: "Nam",
            address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
            major: "Công nghệ thông tin",
            year: "Năm 3",
            status: "active",
            roomAssigned: "A101",
          },
          {
            id: 2,
            studentId: "SV002",
            fullName: "Trần Thị Bình",
            email: "binh.tran@example.com",
            phoneNumber: "0923456789",
            dateOfBirth: "2001-02-20",
            gender: "Nữ",
            address: "456 Đường Lê Lợi, Quận 3, TP.HCM",
            major: "Quản trị kinh doanh",
            year: "Năm 2",
            status: "active",
            roomAssigned: "C301",
          },
          {
            id: 3,
            studentId: "SV003",
            fullName: "Lê Văn Cường",
            email: "cuong.le@example.com",
            phoneNumber: "0934567890",
            dateOfBirth: "1999-08-10",
            gender: "Nam",
            address: "789 Đường Võ Văn Tần, Quận 10, TP.HCM",
            major: "Kỹ thuật điện",
            year: "Năm 4",
            status: "active",
            roomAssigned: "B201",
          },
          {
            id: 4,
            studentId: "SV004",
            fullName: "Phạm Thị Dung",
            email: "dung.pham@example.com",
            phoneNumber: "0945678901",
            dateOfBirth: "2002-11-25",
            gender: "Nữ",
            address: "101 Đường 3/2, Quận 5, TP.HCM",
            major: "Marketing",
            year: "Năm 1",
            status: "active",
            roomAssigned: "C302",
          },
          {
            id: 5,
            studentId: "SV005",
            fullName: "Trần Văn Eo",
            email: "eo.tran@example.com",
            phoneNumber: "0956789012",
            dateOfBirth: "2000-07-30",
            gender: "Nam",
            address: "202 Đường Nguyễn Thị Minh Khai, Quận 3, TP.HCM",
            major: "Công nghệ thông tin",
            year: "Năm 3",
            status: "graduated",
            roomAssigned: null,
          },
          {
            id: 6,
            studentId: "SV006",
            fullName: "Lý Thị Phương",
            email: "phuong.ly@example.com",
            phoneNumber: "0967890123",
            dateOfBirth: "2001-04-05",
            gender: "Nữ",
            address: "303 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM",
            major: "Công nghệ sinh học",
            year: "Năm 2",
            status: "suspended",
            roomAssigned: null,
          },
          {
            id: 7,
            studentId: "SV007",
            fullName: "Hồ Văn Giang",
            email: "giang.ho@example.com",
            phoneNumber: "0978901234",
            dateOfBirth: "1999-12-15",
            gender: "Nam",
            address: "404 Đường Lý Thường Kiệt, Quận 10, TP.HCM",
            major: "Kinh tế học",
            year: "Năm 4",
            status: "active",
            roomAssigned: "D401",
          },
          {
            id: 8,
            studentId: "SV008",
            fullName: "Nguyễn Thị Hoa",
            email: "hoa.nguyen@example.com",
            phoneNumber: "0989012345",
            dateOfBirth: "2002-01-01",
            gender: "Nữ",
            address: "505 Đường Nguyễn Trãi, Quận 5, TP.HCM",
            major: "Ngôn ngữ Anh",
            year: "Năm 1",
            status: "active",
            roomAssigned: null,
          },
        ];

        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Failed to load students data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Apply filters, search and sort
  useEffect(() => {
    let result = [...students];

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (student) =>
          student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (student.roomAssigned &&
            student.roomAssigned
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.gender) {
      result = result.filter((student) => student.gender === filters.gender);
    }

    if (filters.major) {
      result = result.filter((student) => student.major === filters.major);
    }

    if (filters.year) {
      result = result.filter((student) => student.year === filters.year);
    }

    if (filters.status) {
      result = result.filter((student) => student.status === filters.status);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredStudents(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [students, searchTerm, filters, sortConfig]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      gender: "",
      major: "",
      year: "",
      status: "",
    });
    setSearchTerm("");
  };

  // Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();

    try {
      // In a real app, you would send this data to your API
      // Example: await studentService.createStudent(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Generate a new ID (in a real app, the server would do this)
      const newId = Math.max(...students.map((student) => student.id)) + 1;

      const newStudent = {
        id: newId,
        ...formData,
        roomAssigned: null, // New students don't have a room assigned by default
      };

      setStudents([...students, newStudent]);
      setShowAddModal(false);
      resetFormData();
      toast.success("Sinh viên đã được thêm thành công");
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Không thể thêm sinh viên mới");
    }
  };

  // Update student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    try {
      // In a real app, you would send this data to your API
      // Example: await studentService.updateStudent(selectedStudent.id, formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedStudents = students.map((student) =>
        student.id === selectedStudent.id
          ? { ...student, ...formData, roomAssigned: student.roomAssigned }
          : student
      );

      setStudents(updatedStudents);
      setShowEditModal(false);
      resetFormData();
      toast.success("Thông tin sinh viên đã được cập nhật");
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Không thể cập nhật thông tin sinh viên");
    }
  };

  // Delete student
  const handleDeleteStudent = async () => {
    try {
      // In a real app, you would send this request to your API
      // Example: await studentService.deleteStudent(selectedStudent.id);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedStudents = students.filter(
        (student) => student.id !== selectedStudent.id
      );

      setStudents(updatedStudents);
      setShowDeleteModal(false);
      toast.success("Sinh viên đã được xóa khỏi hệ thống");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Không thể xóa sinh viên");
    }
  };

  // Open edit modal and populate form
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      studentId: student.studentId,
      fullName: student.fullName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      address: student.address,
      major: student.major,
      year: student.year,
      status: student.status,
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  // Open view modal
  const openViewModal = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      studentId: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      major: "",
      year: "",
      status: "active",
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
            Đang học
          </span>
        );
      case "graduated":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
            Đã tốt nghiệp
          </span>
        );
      case "suspended":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
            Đình chỉ
          </span>
        );
      case "onleave":
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
            Tạm nghỉ
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Quản lý sinh viên
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FaPlus className="mr-2" />
          Thêm sinh viên mới
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800 flex items-center">
            <FaFilter className="mr-2" />
            Lọc và tìm kiếm
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sinh viên..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* Gender filter */}
            <div>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tất cả giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            {/* Major filter */}
            <div>
              <select
                name="major"
                value={filters.major}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tất cả ngành học</option>
                <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
                <option value="Kỹ thuật điện">Kỹ thuật điện</option>
                <option value="Marketing">Marketing</option>
                <option value="Công nghệ sinh học">Công nghệ sinh học</option>
                <option value="Kinh tế học">Kinh tế học</option>
                <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
              </select>
            </div>

            {/* Status filter */}
            <div>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="active">Đang học</option>
                <option value="graduated">Đã tốt nghiệp</option>
                <option value="suspended">Đình chỉ</option>
                <option value="onleave">Tạm nghỉ</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={resetFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("studentId")}
                    >
                      <div className="flex items-center">
                        MSSV
                        {sortConfig.key === "studentId" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("fullName")}
                    >
                      <div className="flex items-center">
                        Họ và tên
                        {sortConfig.key === "fullName" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("email")}
                    >
                      <div className="flex items-center">
                        Email
                        {sortConfig.key === "email" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("roomAssigned")}
                    >
                      <div className="flex items-center">
                        Phòng
                        {sortConfig.key === "roomAssigned" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("major")}
                    >
                      <div className="flex items-center">
                        Ngành học
                        {sortConfig.key === "major" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("status")}
                    >
                      <div className="flex items-center">
                        Trạng thái
                        {sortConfig.key === "status" &&
                          (sortConfig.direction === "ascending" ? (
                            <FaSortAmountUp className="ml-1" />
                          ) : (
                            <FaSortAmountDown className="ml-1" />
                          ))}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.studentId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.roomAssigned ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {student.roomAssigned}
                            </span>
                          ) : (
                            <span className="text-gray-400">
                              Chưa phân phòng
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.major}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(student.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openViewModal(student)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Xem chi tiết"
                            >
                              <FaEye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(student)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Chỉnh sửa"
                            >
                              <FaEdit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(student)}
                              className="text-red-600 hover:text-red-900"
                              title="Xóa"
                            >
                              <FaTrash className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        Không tìm thấy sinh viên nào phù hợp với điều kiện tìm
                        kiếm
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredStudents.length > studentsPerPage && (
              <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị{" "}
                    <span className="font-medium">
                      {indexOfFirstStudent + 1}
                    </span>{" "}
                    đến{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastStudent, filteredStudents.length)}
                    </span>{" "}
                    trong tổng số{" "}
                    <span className="font-medium">
                      {filteredStudents.length}
                    </span>{" "}
                    sinh viên
                  </p>
                </div>
                <div>
                  <nav className="flex space-x-2" aria-label="Pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Trước
                    </button>
                    {Array.from({
                      length: Math.ceil(
                        filteredStudents.length / studentsPerPage
                      ),
                    }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(filteredStudents.length / studentsPerPage)
                      }
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        currentPage ===
                        Math.ceil(filteredStudents.length / studentsPerPage)
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Tiếp
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddStudent}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Thêm sinh viên mới
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        MSSV
                      </label>
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Giới tính
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ngành học
                      </label>
                      <select
                        name="major"
                        value={formData.major}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Chọn ngành học</option>
                        <option value="Công nghệ thông tin">
                          Công nghệ thông tin
                        </option>
                        <option value="Quản trị kinh doanh">
                          Quản trị kinh doanh
                        </option>
                        <option value="Kỹ thuật điện">Kỹ thuật điện</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Công nghệ sinh học">
                          Công nghệ sinh học
                        </option>
                        <option value="Kinh tế học">Kinh tế học</option>
                        <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Năm học
                      </label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Chọn năm học</option>
                        <option value="Năm 1">Năm 1</option>
                        <option value="Năm 2">Năm 2</option>
                        <option value="Năm 3">Năm 3</option>
                        <option value="Năm 4">Năm 4</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Trạng thái
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="active">Đang học</option>
                        <option value="graduated">Đã tốt nghiệp</option>
                        <option value="suspended">Đình chỉ</option>
                        <option value="onleave">Tạm nghỉ</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Thêm sinh viên
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      resetFormData();
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleUpdateStudent}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Cập nhật thông tin sinh viên
                  </h3>

                  {/* Same form fields as Add Student modal */}
                  {/* ... */}
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cập nhật
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      resetFormData();
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Student Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      Xóa sinh viên
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bạn có chắc chắn muốn xóa sinh viên{" "}
                        {selectedStudent?.fullName} (
                        {selectedStudent?.studentId})? Hành động này không thể
                        hoàn tác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteStudent}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Xóa
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Thông tin chi tiết sinh viên
                  </h3>
                  {getStatusBadge(selectedStudent.status)}
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-700">
                      <FaUserGraduate className="h-20 w-20" />
                    </div>
                  </div>

                  <div className="text-center">
                    <h2 className="text-xl font-bold">
                      {selectedStudent.fullName}
                    </h2>
                    <p className="text-gray-600">
                      {selectedStudent.major} - {selectedStudent.year}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <FaIdCard className="mr-2 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">MSSV</p>
                        <p className="font-medium">
                          {selectedStudent.studentId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <FaBed className="mr-2 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Phòng</p>
                        <p className="font-medium">
                          {selectedStudent.roomAssigned || "Chưa phân phòng"}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{selectedStudent.email}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Số điện thoại</p>
                      <p className="font-medium">
                        {selectedStudent.phoneNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Ngày sinh</p>
                      <p className="font-medium">
                        {formatDate(selectedStudent.dateOfBirth)}
                        <span className="text-xs text-gray-500 ml-1">
                          ({calculateAge(selectedStudent.dateOfBirth)} tuổi)
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Giới tính</p>
                      <p className="font-medium">{selectedStudent.gender}</p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Địa chỉ</p>
                      <p className="font-medium">{selectedStudent.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => openEditModal(selectedStudent)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  onClick={() => setShowViewModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
