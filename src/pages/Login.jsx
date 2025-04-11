import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex bg-white">

			{/* Bên phải form */}
			<div className=" w-[30%] h-[80%] flex flex-col p-20 bg-white mx-auto my-10 border border-transparent rounded-2xl shadow-2xl ">
				<h1 className="text-[32px] uppercase font-bold text-yellow-500 text-center font-poppins">
					DORMANAGE
				</h1>
                <p className='text-center text-yellow-700'>Dormitory Manage</p>

				{/* Form Login */}
				<div className="mt-8">
					<h3 className="text-3xl font-semibold mb-4 text-center">Đăng Nhập</h3>
					<p className="text-sm mb-4">Vui lòng điền thông tin đăng nhập của bạn.</p>
					<div className="space-y-4">
						<input
							type="text"
							placeholder="Email"
							className="w-full p-3  bg-gray-100 rounded-[50px] shadow-2xl"
						/>
						<input
							type="password"
							placeholder="Password"
							className="w-full p-3  bg-gray-100 rounded-[50px] shadow-2xl"
						/>
					</div>

					<div className="flex items-center justify-between mt-4">
						<label className="flex items-center">
							<input type="checkbox" className="w-4 h-4 mr-2" />
							<span className="text-sm">Lưu đăng nhập</span>
						</label>
						<p className="text-sm font-medium underline cursor-pointer">Quên mật khẩu</p>
					</div>

					{/* Nút hành động */}
					<div className="flex space-y-4 space-x-4 mt-8 items-end justify-end">
						<button
							className="w-[30%] py-4 bg-black text-white font-semibold rounded-md hover:bg-yellow-500 hover:text-black transition transform duration-300"
						>
							Đăng Nhập
						</button>
						<button
                            onClick={() => navigate('/register')}
							className="w-[30%] py-4 bg-black text-white font-semibold rounded-md hover:bg-yellow-500 hover:text-black transition transform duration-300 "
						>
							Đăng Ký
						</button>
					</div>

					<div className="w-full flex justify-center mt-4">
						<p className="text-sm">
							Bạn chưa có tài khoản?{' '}
							<span
                                onClick={() => navigate('/register')}
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
				</div>
			</div>
		</div>
  )
}

export default Login