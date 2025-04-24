import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await authService.login(
        formData.email,
        formData.password
      );

      if (response.data != []) {
        // Save token and user data to localStorage
        authService.saveAuth(response.data);

        // Redirect to home page
        if (response.data.user.role === "ADMIN") {
          navigate("/admin");
        }
        if (response.data.user.role === "STUDENT") {
          navigate("/user/dashboard");
        }
      } else {
        setLoginError(response.message);
      }
    } catch (error) {
      setLoginError(
        error?.data?.error || "Đã xảy ra lỗi trong quá trình đăng nhập"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Implement forgot password functionality here
    // For now, just show an alert
    alert("Chức năng quên mật khẩu sẽ được phát triển sau!");
  };

  return (
    <div className="w-full h-auto flex bg-white pt-[250px]">
      {/* Bên phải form */}
      <div className="w-[30%] h-auto flex flex-col p-20 bg-white mx-auto my-10 border border-transparent rounded-2xl shadow-2xl">
        <h1 className="text-[32px] uppercase font-bold text-yellow-500 text-center font-poppins">
          DORMANAGE
        </h1>
        <p className="text-center text-yellow-700">Dormitory Manage</p>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="mt-8">
          <h3 className="text-3xl font-semibold mb-4 text-center">Đăng Nhập</h3>
          <p className="text-sm mb-4">
            Vui lòng điền thông tin đăng nhập của bạn.
          </p>

          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {loginError}
            </div>
          )}

          <div className="space-y-4">
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
                <p className="text-red-500 text-sm mt-1 ml-4">{errors.email}</p>
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
          </div>

          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 mr-2"
              />
              <span className="text-sm">Lưu đăng nhập</span>
            </label>
            <p
              className="text-sm font-medium underline cursor-pointer"
              onClick={handleForgotPassword}
            >
              Quên mật khẩu
            </p>
          </div>

          {/* Nút hành động */}
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
              {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="w-[30%] py-4 bg-black text-white font-semibold rounded-md hover:bg-yellow-500 hover:text-black transition transform duration-300"
            >
              Đăng Ký
            </button>
          </div>

          <div className="w-full flex justify-center mt-4">
            <p className="text-sm">
              Bạn chưa có tài khoản?{" "}
              <span
                onClick={() => navigate("/register")}
                className="font-semibold underline cursor-pointer"
              >
                Đăng Ký Tại Đây
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
  );
};
export default Login;
