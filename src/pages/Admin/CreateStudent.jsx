// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import api from "../../api/axios";

// const CreateStudent = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch classes for dropdown
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await api.get("/admin/get-all-classes");
//         setClasses(res.data.classes);
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//       }
//     };

//     fetchClasses();
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
//       setMessage("");

//       await api.post("/admin/create-student", data);

//       setMessage("Student created successfully ✅");
//       reset();
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Create Student</h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded-lg shadow max-w-xl"
//       >
//         {/* Name */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Name</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             {...register("name", { required: "Name is required" })}
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm">{errors.name.message}</p>
//           )}
//         </div>

//         {/* Username */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Username</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             {...register("username", { required: "Username is required" })}
//           />
//           {errors.username && (
//             <p className="text-red-500 text-sm">{errors.username.message}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Password</label>
//           <input
//             type="password"
//             className="w-full border p-2 rounded"
//             {...register("password", { required: "Password is required" })}
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm">{errors.password.message}</p>
//           )}
//         </div>

//         {/* Roll Number */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Roll Number</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             {...register("rollNumber", {
//               required: "Roll number is required",
//             })}
//           />
//           {errors.rollNumber && (
//             <p className="text-red-500 text-sm">{errors.rollNumber.message}</p>
//           )}
//         </div>

//         {/* Class Dropdown */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Select Class</label>
//           <select
//             className="w-full border p-2 rounded"
//             {...register("classId", { required: "Class is required" })}
//           >
//             <option value="">-- Select Class --</option>
//             {classes.map((cls) => (
//               <option key={cls._id} value={cls._id}>
//                 {cls.className} - {cls.section}
//               </option>
//             ))}
//           </select>
//           {errors.classId && (
//             <p className="text-red-500 text-sm">{errors.classId.message}</p>
//           )}
//         </div>

//         {/* Parent Name */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Parent Name</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             {...register("parentName")}
//           />
//         </div>

//         {/* Phone */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Phone</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             {...register("phone")}
//           />
//         </div>

//         {/* Address */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Address</label>
//           <textarea
//             className="w-full border p-2 rounded"
//             {...register("address")}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//         >
//           {loading ? "Creating..." : "Create Student"}
//         </button>

//         {message && <p className="mt-4 text-center font-medium">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default CreateStudent;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

const CreateStudent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/admin/get-all-classes");
        setClasses(res.data.classes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage("");

      await api.post("/admin/create-student", data);

      setMessage("Student created successfully ✅");
      reset();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">STUDENT MANAGEMENT</p>
        <h1 className="text-3xl font-bold">Create Student</h1>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name + Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Name</label>
              <input
                type="text"
                placeholder="Enter student name"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          {/* Password + Roll */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Roll Number
              </label>
              <input
                type="text"
                placeholder="Enter roll number"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("rollNumber", {
                  required: "Roll number is required",
                })}
              />
              {errors.rollNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rollNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Class Dropdown */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Select Class
            </label>
            <select
              className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
              {...register("classId", { required: "Class is required" })}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className} - {cls.section}
                </option>
              ))}
            </select>

            {errors.classId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.classId.message}
              </p>
            )}
          </div>

          {/* Parent + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Parent Name
              </label>
              <input
                type="text"
                placeholder="Enter parent name"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("parentName")}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Phone</label>
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("phone")}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Address</label>
            <textarea
              rows="3"
              placeholder="Enter address"
              className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
              {...register("address")}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition"
          >
            {loading ? "Creating..." : "Create Student"}
          </button>

          {/* Message */}
          {message && (
            <p className="text-center text-sm font-medium mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
