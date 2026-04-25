// import { useState, useContext } from "react";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const { setUserRole } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await api.post("/auth/login", form);

//       const role = res.data.role;

//       setUserRole(role);

//       if (role === "admin") navigate("/admin");
//       if (role === "teacher") navigate("/teacher");
//       if (role === "student") navigate("/student");
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-lg shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full p-2 mb-4 border rounded"
//           value={form.username}
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUserRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);
      const role = res.data.role;

      setUserRole(role);

      if (role === "admin") navigate("/admin");
      if (role === "teacher") navigate("/teacher");
      if (role === "student") navigate("/student");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-100 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f')] bg-cover bg-center opacity-30"></div>

      {/* Card */}
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Panel (hidden on small screens) */}
        <div className="hidden md:flex md:w-1/2 bg-teal-800 text-white p-8 flex-col justify-between">
          <div>
            <h2 className="text-xs tracking-widest uppercase opacity-80">
              Institutional Access
            </h2>
            <h1 className="text-3xl md:text-4xl font-bold mt-4">
              Scholarly <br /> SMS
            </h1>
            <div className="w-12 h-1 bg-teal-400 mt-4"></div>
          </div>

          <p className="text-sm opacity-80">
            "Knowledge is the only wealth that grows when shared."
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center md:text-left">
            Welcome back
          </h2>
          <p className="text-gray-500 mb-6 text-center md:text-left text-sm sm:text-base">
            Enter your credentials to access the portal
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email or Username"
              className="w-full p-3 mb-4 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm mb-4 gap-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Keep me logged in
              </label>
              <span className="text-teal-600 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition text-sm sm:text-base"
            >
              Enter Portal →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
