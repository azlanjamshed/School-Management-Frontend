// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import api from "../../api/axios";

// const AssignTeacher = () => {
//   const { register, handleSubmit } = useForm();

//   const [classes, setClasses] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const classRes = await api.get("/admin/get-all-classes");
//         const teacherRes = await api.get("/admin/get-all-teachers");
//         console.log(teacherRes.data.teachers);
//         setClasses(classRes.data.classes ?? []);
//         setTeachers(teacherRes.data.teachers ?? []);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       setMessage("");

//       const selectedClass = classes.find((cls) => cls._id === data.classId);

//       const teacherAssignedClass = classes.find(
//         (cls) =>
//           cls.classTeacher &&
//           cls.classTeacher._id === data.teacherId &&
//           cls._id !== data.classId,
//       );

//       if (selectedClass?.classTeacher) {
//         const confirmReplace = window.confirm(
//           `Class ${selectedClass.className}-${selectedClass.section} already has a teacher. Replace it?`,
//         );
//         if (!confirmReplace) return;
//       }

//       if (teacherAssignedClass) {
//         const confirmReassign = window.confirm(
//           `This teacher is already assigned to class ${teacherAssignedClass.className}-${teacherAssignedClass.section}. Reassign?`,
//         );
//         if (!confirmReassign) return;
//       }

//       await api.put("/admin/assign-class", {
//         classId: data.classId,
//         teacherId: data.teacherId,
//       });

//       setMessage("Teacher assigned successfully ✅");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Error ❌");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <p className="text-sm text-gray-500">ACADEMIC MANAGEMENT</p>
//         <h1 className="text-3xl font-bold">Assign Teacher</h1>
//       </div>

//       {/* Form Card */}
//       <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* Class Dropdown */}
//           <div>
//             <label className="text-sm text-gray-600 mb-1 block">
//               Select Class
//             </label>

//             <div className="relative">
//               <select
//                 className="w-full appearance-none p-3 pr-10 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//                 {...register("classId", { required: true })}
//               >
//                 <option value="">Select Class</option>
//                 {classes.map((cls) => (
//                   <option key={cls._id} value={cls._id}>
//                     {cls.className} - {cls.section}
//                   </option>
//                 ))}
//               </select>

//               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
//                 ▼
//               </div>
//             </div>
//           </div>

//           {/* Teacher Dropdown */}
//           <div>
//             <label className="text-sm text-gray-600 mb-1 block">
//               Select Teacher
//             </label>

//             <div className="relative">
//               <select
//                 className="w-full appearance-none p-3 pr-10 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
//                 {...register("teacherId", { required: true })}
//               >
//                 <option value="">Select Teacher</option>
//                 {/* {teachers.map((teacher) => (
//                   <option key={teacher._id} value={teacher.userId?._id}>

//                     {teacher.userId.name} ({teacher.subject})
//                   </option>
//                 ))} */}
//                 {teachers.map((teacher) => (
//                   <option key={teacher._id} value={teacher._id}>
//                     {teacher.userId.name} ({teacher.subject})
//                   </option>
//                 ))}
//               </select>

//               <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
//                 ▼
//               </div>
//             </div>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition"
//           >
//             Assign Teacher
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

// export default AssignTeacher;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

import {
  FaChalkboardTeacher,
  FaSchool,
  FaUserTie,
  FaExchangeAlt,
} from "react-icons/fa";

const AssignTeacher = () => {
  const { register, handleSubmit, reset } = useForm();

  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRes = await api.get("/admin/get-all-classes");

        const teacherRes = await api.get("/admin/get-all-teachers");

        setClasses(classRes.data.classes ?? []);
        setTeachers(teacherRes.data.teachers ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setMessage("");

      const selectedClass = classes.find((cls) => cls._id === data.classId);

      const teacherAssignedClass = classes.find(
        (cls) =>
          cls.classTeacher &&
          cls.classTeacher._id === data.teacherId &&
          cls._id !== data.classId,
      );

      // Replace Existing Teacher
      if (selectedClass?.classTeacher) {
        const confirmReplace = window.confirm(
          `Class ${selectedClass.className}-${selectedClass.section} already has a teacher. Replace it?`,
        );

        if (!confirmReplace) return;
      }

      // Reassign Teacher
      if (teacherAssignedClass) {
        const confirmReassign = window.confirm(
          `This teacher is already assigned to class ${teacherAssignedClass.className}-${teacherAssignedClass.section}. Reassign?`,
        );

        if (!confirmReassign) return;
      }

      await api.put("/admin/assign-class", {
        classId: data.classId,
        teacherId: data.teacherId,
      });

      setMessage("Teacher assigned successfully ✅");

      reset();

      // Refresh Classes
      const classRes = await api.get("/admin/get-all-classes");

      setClasses(classRes.data.classes ?? []);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error ❌");
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

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-2">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              Assign Teacher
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Assign teachers to academic classes
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4 w-fit">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xl">
              <FaExchangeAlt />
            </div>

            <div>
              <p className="text-xs text-gray-500">Assignment Portal</p>

              <h3 className="font-semibold text-gray-800">
                Teacher Allocation
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {/* Total Classes */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl">
            <FaSchool />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Classes</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {classes.length}
            </h2>
          </div>
        </div>

        {/* Teachers */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
            <FaUserTie />
          </div>

          <div>
            <p className="text-sm text-gray-500">Available Teachers</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {teachers.length}
            </h2>
          </div>
        </div>

        {/* Assigned */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
            <FaChalkboardTeacher />
          </div>

          <div>
            <p className="text-sm text-gray-500">Assigned Classes</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {classes.filter((cls) => cls.classTeacher).length}
            </h2>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-600 p-6 sm:p-8">
          <h2 className="text-white text-xl sm:text-2xl font-bold">
            Teacher Assignment
          </h2>

          <p className="text-teal-50 mt-2 text-sm sm:text-base">
            Select a class and assign a teacher
          </p>
        </div>

        {/* Form */}
        <div className="p-5 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Class */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaSchool className="text-teal-700" />
                  Select Class
                </label>

                <div className="relative">
                  <select
                    className="
                      w-full
                      appearance-none
                      bg-gray-100
                      rounded-2xl
                      px-4 py-3
                      pr-12
                      outline-none
                      border border-transparent
                      transition
                      focus:ring-4
                      focus:ring-teal-100
                      focus:border-teal-500
                    "
                    {...register("classId", {
                      required: true,
                    })}
                  >
                    <option value="">Select Class</option>

                    {classes.map((cls) => (
                      <option key={cls._id} value={cls._id}>
                        {cls.className} - {cls.section}
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    ▼
                  </div>
                </div>
              </div>

              {/* Teacher */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FaUserTie className="text-teal-700" />
                  Select Teacher
                </label>

                <div className="relative">
                  <select
                    className="
                      w-full
                      appearance-none
                      bg-gray-100
                      rounded-2xl
                      px-4 py-3
                      pr-12
                      outline-none
                      border border-transparent
                      transition
                      focus:ring-4
                      focus:ring-teal-100
                      focus:border-teal-500
                    "
                    {...register("teacherId", {
                      required: true,
                    })}
                  >
                    <option value="">Select Teacher</option>

                    {teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                        {teacher.userId?.name} ({teacher.subject})
                      </option>
                    ))}
                  </select>

                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    ▼
                  </div>
                </div>
              </div>
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
                {loading ? "Assigning Teacher..." : "Assign Teacher"}
              </button>

              <button
                type="button"
                onClick={() => {
                  reset();
                  setMessage("");
                }}
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

export default AssignTeacher;
