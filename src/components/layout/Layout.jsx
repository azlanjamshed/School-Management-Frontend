import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "./Sidebar";

const Layout = ({ children, menuItems }) => {
  const { setUserRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUserRole(null);
    navigate("/");
  };

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems} onLogout={handleLogout} />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</div>
    </div>
  );
};

export default Layout;
