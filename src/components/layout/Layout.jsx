// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import { AuthContext } from "../../context/AuthContext";
// import Sidebar from "./Sidebar";

// const Layout = ({ children, menuItems }) => {
//   const { setUserRole } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await api.post("/auth/logout");
//     setUserRole(null);
//     navigate("/");
//   };

//   return (
//     <div className="flex">
//       <Sidebar menuItems={menuItems} onLogout={handleLogout} />
//       <div className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</div>
//     </div>
//   );
// };

// export default Layout;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "./Sidebar";

const Layout = ({ children, menuItems }) => {
  const { setUserRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUserRole(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        <div
          className="
            p-4
            sm:p-5
            md:p-6
            lg:p-8
            mt-16 md:mt-0
            min-h-screen
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
