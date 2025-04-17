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
    id: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
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
    key: "name",
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
            id: "SV001",
            name: "Nguyễn Văn An",
            email: "an.nguyen@example.com",
            phone: "0912345678",
            dob: "2000-05-15",
            gender: "Nam",
            address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
            major: "Công nghệ thông tin",
            year: "Năm 3",
            status: "active",
            roomAssigned: "A101",
          },
          // ... các mock data khác
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
      toast.success("Sinh viên đã được thêm thành công");
      return true;
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Không thể thêm sinh viên mới");
      return false;
    }
  };

  // Update student
  const handleUpdateStudent = async (formData) => {
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
      toast.success("Thông tin sinh viên đã được cập nhật");
      return true;
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Không thể cập nhật thông tin sinh viên");
      return false;
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
      return true;
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Không thể xóa sinh viên");
      return false;
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
