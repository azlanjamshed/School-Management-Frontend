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

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await api.get("/admin/get-all-classes");
//         setClasses(res.data.classes);
//       } catch (error) {
//         console.error(error);
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
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <p className="text-sm text-gray-500">STUDENT MANAGEMENT</p>
//         <h1 className="text-3xl font-bold">Create Student</h1>
//       </div>

//       {/* Form Card */}
//       <div className="bg-white rounded-2xl shadow-sm p-6 max-w-3xl">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Name + Username */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm text-gray-600 mb-1 block">Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter student name"
//                 className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//                 {...register("name", { required: "Name is required" })}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="text-sm text-gray-600 mb-1 block">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter username"
//                 className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//                 {...register("username", {
//                   required: "Username is required",
//                 })}
//               />
//               {errors.username && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.username.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Password + Roll */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm text-gray-600 mb-1 block">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//                 {...register("password", {
//                   required: "Password is required",
//                 })}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="text-sm text-gray-600 mb-1 block">
//                 Roll Number
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter roll number"
//                 className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//                 {...register("rollNumber", {
//                   required: "Roll number is required",
//                 })}
//               />
//               {errors.rollNumber && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.rollNumber.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Class Dropdown */}
//           <div>
//             <label className="text-sm text-gray-600 mb-1 block">
//               Select Class
//             </label>
//             <select
//               className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//               {...register("classId", { required: "Class is required" })}
//             >
//               <option value="">Select Class</option>
//               {classes.map((cls) => (
//                 <option key={cls._id} value={cls._id}>
//                   {cls.className} - {cls.section}
//                 </option>
//               ))}
//             </select>

//             {errors.classId && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.classId.message}
//               </p>
//             )}
//           </div>

//           {/* Parent + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm text-gray-600 mb-1 block">
//                 Parent Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter parent name"
//                 className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//                 {...register("parentName")}
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-600 mb-1 block">Phone</label>
//               <input
//                 type="text"
//                 placeholder="Enter phone number"
//                 className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//                 {...register("phone")}
//               />
//             </div>
//           </div>

//           {/* Address */}
//           <div>
//             <label className="text-sm text-gray-600 mb-1 block">Address</label>
//             <textarea
//               rows="3"
//               placeholder="Enter address"
//               className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//               {...register("address")}
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition"
//           >
//             {loading ? "Creating..." : "Create Student"}
//           </button>

//           {/* Message */}
//           {message && (
//             <p className="text-center text-sm font-medium mt-2">{message}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateStudent;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

import {
  FaUserGraduate,
  FaUser,
  FaLock,
  FaPhone,
  FaHome,
  FaSchool,
  FaIdBadge,
  FaUsers,
} from "react-icons/fa";

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
      console.log(data);

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
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
          Student Management
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-2">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Create Student
            </h1>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Register a new student into the system
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4 w-fit">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xl">
              <FaUserGraduate />
            </div>

            <div>
              <p className="text-xs text-gray-500">Student Portal</p>

              <h3 className="font-semibold text-gray-800">
                New Student Registration
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-600 p-6 sm:p-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold">
            Student Information
          </h2>

          <p className="text-teal-50 mt-2 text-sm sm:text-base">
            Fill all required student details carefully
          </p>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name + Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaUser className="text-teal-700" />
                  Student Name
                </label>

                <input
                  type="text"
                  placeholder="Enter student name"
                  className="
                    w-full
                    bg-gray-100
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    border border-transparent
                    transition
                    focus:ring-4
                    focus:ring-teal-100
                    focus:border-teal-500
                  "
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaIdBadge className="text-teal-700" />
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  className="
                    w-full
                    bg-gray-100
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    border border-transparent
                    transition
                    focus:ring-4
                    focus:ring-teal-100
                    focus:border-teal-500
                  "
                  {...register("username", {
                    required: "Username is required",
                  })}
                />

                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password + Roll */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaLock className="text-teal-700" />
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter password"
                  className="
                    w-full
                    bg-gray-100
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    border border-transparent
                    transition
                    focus:ring-4
                    focus:ring-teal-100
                    focus:border-teal-500
                  "
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Roll */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaIdBadge className="text-teal-700" />
                  Roll Number
                </label>

                <input
                  type="text"
                  placeholder="Enter roll number"
                  className="
                    w-full
                    bg-gray-100
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    border border-transparent
                    transition
                    focus:ring-4
                    focus:ring-teal-100
                    focus:border-teal-500
                  "
                  {...register("rollNumber", {
                    required: "Roll number is required",
                  })}
                />

                {errors.rollNumber && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.rollNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Class */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaSchool className="text-teal-700" />
                Select Class
              </label>

              <select
                className="
                  w-full
                  bg-gray-100
                  rounded-2xl
                  px-4 py-3
                  outline-none
                  border border-transparent
                  transition
                  focus:ring-4
                  focus:ring-teal-100
                  focus:border-teal-500
                "
                {...register("classId", {
                  required: "Class is required",
                })}
              >
                <option value="">Select Class</option>

                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className} - {cls.section}
                  </option>
                ))}
              </select>

              {errors.classId && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.classId.message}
                </p>
              )}
            </div>

            {/* Parent + Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Parent */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaUsers className="text-teal-700" />
                  Parent Name
                </label>

                <input
                  type="text"
                  placeholder="Enter parent name"
                  className="
                    w-full
                    bg-gray-100
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    border border-transparent
                    transition
                    focus:ring-4
                    focus:ring-teal-100
                    focus:border-teal-500
                  "
                  {...register("parentName")}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaPhone className="text-teal-700" />
                  Phone Number
                </label>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="
                    w-full
                    bg-gray-100
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    border border-transparent
                    transition
                    focus:ring-4
                    focus:ring-teal-100
                    focus:border-teal-500
                  "
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaHome className="text-teal-700" />
                Address
              </label>

              <textarea
                rows="4"
                placeholder="Enter student address"
                className="
                  w-full
                  bg-gray-100
                  rounded-2xl
                  px-4 py-3
                  outline-none
                  border border-transparent
                  transition
                  resize-none
                  focus:ring-4
                  focus:ring-teal-100
                  focus:border-teal-500
                "
                {...register("address")}
              />
            </div>

            {/* Message */}
            {message && (
              <div
                className={`
                  rounded-2xl
                  px-4 py-3
                  text-sm font-medium
                  ${
                    message.includes("successfully")
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }
                `}
              >
                {message}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="
                  flex-1
                  bg-teal-700
                  hover:bg-teal-800
                  text-white
                  py-3.5
                  rounded-2xl
                  font-semibold
                  transition
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                "
              >
                {loading ? "Creating Student..." : "Create Student"}
              </button>

              <button
                type="button"
                onClick={() => reset()}
                className="
                  flex-1
                  bg-gray-200
                  hover:bg-gray-300
                  text-gray-700
                  py-3.5
                  rounded-2xl
                  font-semibold
                  transition
                "
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
