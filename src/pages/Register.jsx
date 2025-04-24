import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    dob: "",
    phone: "",
    password: "",
    gender: "",
    major: "",
    year: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear field-specific error when user makes changes
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    // Clear general error message when form changes
    if (registerError) {
      setRegisterError("");
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Student ID validation
    if (!formData.id) {
      newErrors.id = "MSSV không được để trống";
    }

    // Full name validation
    if (!formData.name) {
      newErrors.name = "Họ và tên không được để trống";
    } else if (formData.name.length < 3) {
      newErrors.name = "Họ và tên phải có ít nhất 3 ký tự";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Date of birth validation
    if (!formData.dob) {
      newErrors.dob = "Ngày sinh không được để trống";
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 16) {
        newErrors.dob = "Bạn phải từ 16 tuổi trở lên";
      } else if (age > 100) {
        newErrors.dob = "Ngày sinh không hợp lệ";
      }
    }

    // Phone number validation
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setRegisterError("");

    try {
      const response = await authService.register(formData);

      if (response) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      }
    } catch (error) {
      // Handle registration errors
      if (error.status === 409) {
        setRegisterError("Email hoặc MSSV đã được sử dụng");
      } else {
        setRegisterError(
          error.message || "Đã xảy ra lỗi trong quá trình đăng ký"
        );
      }
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full h-auto flex bg-white pt-[250px]">
        {/* Form container */}
        <div className="w-[30%] h-auto flex flex-col p-20 bg-white mx-auto my-10 border border-transparent rounded-2xl shadow-2xl">
          <h1 className="text-[32px] uppercase font-bold text-yellow-500 text-center font-poppins">
            DORMANAGE
          </h1>
          <p className="text-center text-yellow-700">Dormitory Manage</p>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <h3 className="text-3xl font-semibold mb-4 text-center">Đăng Ký</h3>
            <p className="text-sm mb-4">
              Vui lòng điền thông tin chính xác để đăng ký tài khoản.
            </p>

            {registerError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                {registerError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="id"
                  placeholder="MSSV"
                  value={formData.id}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-100 rounded-[50px] shadow-xl border ${
                    errors.id ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.id && (
                  <p className="text-red-500 text-sm mt-1 ml-4">{errors.id}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-100 rounded-[50px] shadow-xl border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-100 rounded-[50px] shadow-xl border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-100 rounded-[50px] shadow-xl border ${
                    errors.dob ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.dob && (
                  <p className="text-red-500 text-sm mt-1 ml-4">{errors.dob}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-100 rounded-[50px] shadow-xl border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="major"
                  placeholder="Ngành học"
                  value={formData.major}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-100 rounded-[50px] shadow-xl border ${
                    errors.major ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.major && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.major}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="year"
                  placeholder="Khóa"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-100 rounded-[50px] shadow-xl border ${
                    errors.year ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.year}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-100 rounded-[50px] shadow-xl border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full p-3 bg-gray-100 text-black rounded-[50px] shadow-2xl border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="" disabled hidden>
                    Chọn giới tính
                  </option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-y-4 space-x-4 mt-8 items-end justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-[30%] py-4 font-semibold rounded-md transition transform duration-300 ${
                  isLoading
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-yellow-500 hover:text-black"
                }`}
              >
                {isLoading ? "Đang xử lý..." : "Đăng Ký"}
              </button>
            </div>

            <div className="w-full flex justify-center mt-4">
              <p className="text-sm">
                Bạn đã có tài khoản?{" "}
                <span
                  className="font-semibold underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập ngay
                </span>
              </p>
            </div>
            <div className="w-full flex justify-center mt-4">
              <Link to="/" className="font-bold underline">
                Quay Lại
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
