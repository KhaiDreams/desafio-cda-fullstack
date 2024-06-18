import { Route, Routes } from "react-router-dom";
import "./global.css";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
