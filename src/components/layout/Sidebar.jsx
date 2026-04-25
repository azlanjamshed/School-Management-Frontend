// import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { useContext } from "react";

// const Sidebar = ({ menuItems, onLogout }) => {
//   const { userRole } = useContext(AuthContext);
//   const location = useLocation();
//   const role = userRole.charAt(0).toUpperCase() + userRole.slice(1); // Capitalize first letter

//   return (
//     <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
//       <h2 className="text-xl font-bold mb-6">{role} Panel</h2>

//       <ul className="space-y-3">
//         {menuItems.map((item) => (
//           <li key={item.path}>
//             <Link
//               to={item.path}
//               className={`block p-2 rounded ${
//                 location.pathname === item.path
//                   ? "bg-gray-600"
//                   : "hover:bg-gray-700"
//               }`}
//             >
//               {item.label}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={onLogout}
//         className="mt-8 bg-red-500 w-full py-2 rounded hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import {
  FaThLarge,
  FaUsers,
  FaGraduationCap,
  FaMoneyBill,
  FaChartBar,
  FaCog,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ menuItems, onLogout }) => {
  const { userRole } = useContext(AuthContext);
  const location = useLocation();
  const role = userRole.charAt(0).toUpperCase() + userRole.slice(1);
  const [open, setOpen] = useState(true);

  const icons = [
    <FaThLarge />,
    <FaUsers />,
    <FaGraduationCap />,
    <FaMoneyBill />,
    <FaChartBar />,
    <FaCog />,
  ];

  return (
    <div
      className={`${
        open ? "w-64" : "w-20"
      } bg-gray-100 min-h-screen flex flex-col justify-between p-4 transition-all duration-300 border-r-0 md:border-r border-gray-300 rounded-tr-lg rounded-br-lg shadow-lg `}
    >
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {open && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 leading-tight">
                Enlightened <br /> Academy
              </h2>
              <p className="text-xs text-gray-500 tracking-widest mt-1">
                {role} PORTAL
              </p>
            </div>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-gray-200"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-full transition-all ${
                    isActive
                      ? "bg-teal-700 text-white"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span className="text-lg">
                    {icons[index] || <FaThLarge />}
                  </span>

                  {open && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>

                {/* Tooltip when collapsed */}
                {!open && (
                  <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Section */}
      <div>
        {/* Profile */}
        <div className="bg-gray-200 rounded-xl p-3 flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-teal-700 text-white rounded-full flex items-center justify-center font-bold">
            {role.charAt(0)}
          </div>

          {open && (
            <div>
              <p className="text-sm font-semibold text-gray-800">{role} User</p>
              <p className="text-xs text-gray-500">{role}</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className={`flex items-center justify-center gap-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition ${
            open ? "w-full py-3" : "p-3 w-full"
          }`}
        >
          <FaSignOutAlt />
          {open && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
