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
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <p className="text-sm text-gray-500">ACADEMIC MANAGEMENT</p>
//         <h1 className="text-3xl font-bold">Create Class</h1>
//       </div>

//       {/* Form Card */}
//       <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Class Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Class Name
//             </label>
//             <input
//               type="text"
//               placeholder="e.g. Grade 10"
//               className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//               {...register("className", {
//                 required: "Class name is required",
//               })}
//             />
//             {errors.className && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.className.message}
//               </p>
//             )}
//           </div>

//           {/* Section */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Section
//             </label>
//             <input
//               type="text"
//               placeholder="e.g. A"
//               className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//               {...register("section", {
//                 required: "Section is required",
//               })}
//             />
//             {errors.section && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.section.message}
//               </p>
//             )}
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition"
//           >
//             {loading ? "Creating..." : "Create Class"}
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

// export default CreateClass;

import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useState } from "react";
import { FaSchool, FaLayerGroup } from "react-icons/fa";

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
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
          Academic Management
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Create Class
            </h1>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Add a new class and section for students
            </p>
          </div>

          {/* Small Info Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4 w-fit">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xl">
              <FaSchool />
            </div>

            <div>
              <p className="text-xs text-gray-500">Management</p>

              <h3 className="font-semibold text-gray-800">
                New Academic Class
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-600 p-6 sm:p-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold">
            Create Academic Class
          </h2>

          <p className="text-teal-50 mt-2 text-sm sm:text-base">
            Fill in the details below to create a new class section.
          </p>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Class Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaSchool className="text-teal-700" />
                  Class Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Grade 10"
                  className="
                    w-full
                    bg-gray-100
                    border border-transparent
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    transition
                    focus:border-teal-500
                    focus:ring-4
                    focus:ring-teal-100
                  "
                  {...register("className", {
                    required: "Class name is required",
                  })}
                />

                {errors.className && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.className.message}
                  </p>
                )}
              </div>

              {/* Section */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaLayerGroup className="text-teal-700" />
                  Section
                </label>

                <input
                  type="text"
                  placeholder="e.g. A"
                  className="
                    w-full
                    bg-gray-100
                    border border-transparent
                    rounded-2xl
                    px-4 py-3
                    outline-none
                    transition
                    focus:border-teal-500
                    focus:ring-4
                    focus:ring-teal-100
                  "
                  {...register("section", {
                    required: "Section is required",
                  })}
                />

                {errors.section && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.section.message}
                  </p>
                )}
              </div>
            </div>

            {/* Success / Error Message */}
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
                {loading ? "Creating Class..." : "Create Class"}
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

export default CreateClass;
