// import { useForm } from "react-hook-form";
// import api from "../../api/axios";
// import { useState } from "react";

// const CreateClass = () => {
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

//       await api.post("/admin/create-class", data);

//       setMessage("Class created successfully ✅");
//       reset();
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Create Class</h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded-lg shadow max-w-md"
//       >
//         {/* Class Name */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Class Name</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             {...register("className", { required: "Class name is required" })}
//           />
//           {errors.className && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.className.message}
//             </p>
//           )}
//         </div>

//         {/* Section */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Section</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             {...register("section", { required: "Section is required" })}
//           />
//           {errors.section && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.section.message}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//         >
//           {loading ? "Creating..." : "Create Class"}
//         </button>

//         {message && <p className="mt-4 text-center font-medium">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default CreateClass;

import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useState } from "react";

const CreateClass = () => {
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

      await api.post("/admin/create-class", data);

      setMessage("Class created successfully ✅");
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
        <p className="text-sm text-gray-500">ACADEMIC MANAGEMENT</p>
        <h1 className="text-3xl font-bold">Create Class</h1>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Class Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Class Name
            </label>
            <input
              type="text"
              placeholder="e.g. Grade 10"
              className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
              {...register("className", {
                required: "Class name is required",
              })}
            />
            {errors.className && (
              <p className="text-red-500 text-sm mt-1">
                {errors.className.message}
              </p>
            )}
          </div>

          {/* Section */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Section
            </label>
            <input
              type="text"
              placeholder="e.g. A"
              className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
              {...register("section", {
                required: "Section is required",
              })}
            />
            {errors.section && (
              <p className="text-red-500 text-sm mt-1">
                {errors.section.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition"
          >
            {loading ? "Creating..." : "Create Class"}
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

export default CreateClass;
