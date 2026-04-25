// import { useForm } from "react-hook-form";
// import api from "../../api/axios";
// import { useState } from "react";

// const CreateTeacher = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
//       setMessage("");

//       await api.post("/admin/create-teacher", data);

//       setMessage("Teacher created successfully ✅");
//       reset();
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Create Teacher</h1>

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
//           <label className="block mb-1 font-medium">Username (Email)</label>
//           <input
//             type="email"
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

//         {/* Subject */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Subject</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             {...register("subject", { required: "Subject is required" })}
//           />
//           {errors.subject && (
//             <p className="text-red-500 text-sm">{errors.subject.message}</p>
//           )}
//         </div>

//         {/* Qualification */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Qualification</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             {...register("qualification")}
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

//         {/* Experience */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Experience (Years)</label>
//           <input
//             type="number"
//             className="w-full border p-2 rounded"
//             {...register("experience", {
//               valueAsNumber: true,
//             })}
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
//           {loading ? "Creating..." : "Create Teacher"}
//         </button>

//         {message && <p className="mt-4 text-center font-medium">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default CreateTeacher;

import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useState } from "react";

const CreateTeacher = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage("");

      await api.post("/admin/create-teacher", data);

      setMessage("Teacher created successfully ✅");
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
        <p className="text-sm text-gray-500">STAFF MANAGEMENT</p>
        <h1 className="text-3xl font-bold">Create Teacher</h1>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name + Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Name</label>
              <input
                type="text"
                placeholder="Enter teacher name"
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
                Email (Username)
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          {/* Password + Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Mathematics"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* Qualification + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Qualification
              </label>
              <input
                type="text"
                placeholder="e.g. M.Sc, B.Ed"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("qualification")}
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

          {/* Experience */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Experience (Years)
            </label>
            <input
              type="number"
              placeholder="e.g. 5"
              className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
              {...register("experience", { valueAsNumber: true })}
            />
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
            {loading ? "Creating..." : "Create Teacher"}
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

export default CreateTeacher;
