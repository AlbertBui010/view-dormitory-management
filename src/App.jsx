import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login"; // import Login page
import Register from "./pages/Register";
import DetailRoom from "./components/DetailRoom";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import Rooms from "./components/admin/Rooms";
import Students from "./components/admin/Students";
import RoomAllocation from "./components/admin/RoomAllocation";
import Payments from "./components/admin/Payments";
import Dormitory from "./components/admin/Dormitory";
import Reports from "./components/admin/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/detail/:id" element={<DetailRoom />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dormitories" element={<Dormitory />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="students" element={<Students />} />
          <Route path="room-allocation" element={<RoomAllocation />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<h1>Reportsssss</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
