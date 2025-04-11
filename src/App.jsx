import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login"; // import Login page
import Register from "./pages/Register";
import DetailRoom from "./components/DetailRoom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<MainLayout />}>
          <Route index  element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/detail/:id" element={<DetailRoom />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
