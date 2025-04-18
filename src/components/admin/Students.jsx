import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

// Import components
import StudentFilters from "./student/StudentFilters";
import StudentsTable from "./student/StudentsTable";
import Pagination from "../Pagination";
import AddStudentModal from "./student/AddStudentModal";
import EditStudentModal from "./student/EditStudentModal";
import DeleteStudentModal from "./student/DeleteStudentModal";
import ViewStudentModal from "./student/ViewStudentModal";
import Spinner from "../Spinner";
import studentService from "../../services/admin/studentService";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const navigate = useNavigate();
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
    id: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    major: "",
    year: "",
    status: "DANGHOC",
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
    key: "name",
    direction: "ascending",
  });

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      try {
        const data = await studentService.getAllStudents();

        // Kiểm tra nếu token hết hạn
        if (data && data.status === 401) {
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          navigate("/login");
          return;
        }

        if (Array.isArray(data)) {
          setStudents(data);
          setFilteredStudents(data);
        } else {
          toast.error("Không thể tải dữ liệu sinh viên");
          setStudents([]);
          setFilteredStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Không thể tải dữ liệu sinh viên. Vui lòng thử lại sau.");
        setStudents([]);
        setFilteredStudents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Apply filters, search and sort
  useEffect(() => {
    if (!Array.isArray(students)) {
      setFilteredStudents([]);
      return;
    }

    let result = [...students];

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
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
  const handleAddStudent = async (formData) => {
    try {
      const response = await studentService.createStudent(formData);
      const newStudent = {
        id: response.id,
        ...formData,
      };

      setStudents([...students, newStudent]);
      setShowAddModal(false);
      toast.success("Sinh viên đã được thêm thành công");
      return true;
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error(error?.data?.message);
      return false;
    }
  };

  // Update student
  const handleUpdateStudent = async (studentData) => {
    try {
      setIsLoading(true);
      const updatedStudent = await studentService.updateStudent(
        selectedStudent.id,
        studentData
      );

      if (updatedStudent && updatedStudent.status === 401) {
        toast.error(updatedStudent.message);
        navigate("/login");
        return false;
      }

      const updatedStudents = students.map((student) =>
        student.id === selectedStudent.id ? updatedStudent : student
      );

      setStudents(updatedStudents);
      toast.success("Cập nhật sinh viên thành công");
      return true;
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Không thể cập nhật sinh viên. Vui lòng thử lại sau.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete student
  const handleDeleteStudent = async () => {
    try {
      setIsLoading(true);
      const result = await studentService.deleteStudent(selectedStudent.id);

      if (result && result.status === 401) {
        toast.error(result.message);
        navigate("/login");
        return false;
      }

      const updatedStudents = students.filter(
        (student) => student.id !== selectedStudent.id
      );

      setStudents(updatedStudents);
      toast.success("Xóa sinh viên thành công");
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Không thể xóa sinh viên. Vui lòng thử lại sau.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit modal and populate form
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setFormData({
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
      dob: student.dob,
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

  // Get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

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

      {/* Filters Component */}
      <StudentFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
        students={students}
      />

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : (
          <StudentsTable
            students={currentStudents}
            sortConfig={sortConfig}
            requestSort={requestSort}
            openViewModal={openViewModal}
            openEditModal={openEditModal}
            openDeleteModal={openDeleteModal}
          />
        )}

        {/* Pagination */}
        {filteredStudents.length > studentsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredStudents.length}
            itemsPerPage={studentsPerPage}
            paginate={setCurrentPage}
            indexOfFirstItem={indexOfFirstStudent}
            indexOfLastItem={Math.min(
              indexOfLastStudent,
              filteredStudents.length
            )}
          />
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddStudent}
        />
      )}

      {showEditModal && selectedStudent && (
        <EditStudentModal
          initialData={formData}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdateStudent}
        />
      )}

      {showDeleteModal && selectedStudent && (
        <DeleteStudentModal
          student={selectedStudent}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteStudent}
        />
      )}

      {showViewModal && selectedStudent && (
        <ViewStudentModal
          student={selectedStudent}
          onClose={() => setShowViewModal(false)}
          onEdit={() => {
            setShowViewModal(false);
            openEditModal(selectedStudent);
          }}
        />
      )}
    </div>
  );
};

export default Students;
