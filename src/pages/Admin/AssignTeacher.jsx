// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import api from "../../api/axios";

// const AssignTeacher = () => {
//   const { register, handleSubmit } = useForm();

//   const [classes, setClasses] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [message, setMessage] = useState("");

//   // Fetch classes
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const classRes = await api.get("/admin/get-all-classes");
//         const teacherRes = await api.get("/admin/get-all-teachers");

//         setClasses(classRes.data.classes ?? []);
//         setTeachers(teacherRes.data.teachers ?? []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       setMessage("");
//       console.log(data);
//       const selectedClass = classes.find((cls) => cls._id === data.classId);

//       // 🔍 Find if teacher already assigned to another class
//       const teacherAssignedClass = classes.find(
//         (cls) =>
//           cls.classTeacher &&
//           cls.classTeacher._id === data.teacherId &&
//           cls._id !== data.classId,
//       );

//       // ⚠️ Case 1: Class already has teacher
//       if (selectedClass?.classTeacher) {
//         const confirmReplace = window.confirm(
//           `Class ${selectedClass.className}-${selectedClass.section} already has a teacher. Replace it?`,
//         );

//         if (!confirmReplace) return;
//       }

//       // ⚠️ Case 2: Teacher already assigned elsewhere
//       if (teacherAssignedClass) {
//         const confirmReassign = window.confirm(
//           `This teacher is already assigned to class ${teacherAssignedClass.className}-${teacherAssignedClass.section}. Reassign?`,
//         );

//         if (!confirmReassign) return;
//       }
//       await api.put("/admin/assign-class", {
//         classId: data.classId,
//         teacherUserId: data.teacherId,
//       });

//       setMessage("Teacher assigned successfully ✅");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Error ❌");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Assign Teacher to Class</h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded-lg shadow max-w-md"
//       >
//         {/* Class Dropdown */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Select Class</label>
//           <select
//             className="w-full border p-2 rounded"
//             {...register("classId", { required: true })}
//           >
//             <option value="">-- Select Class --</option>
//             {classes.map((cls) => (
//               <option key={cls._id} value={cls._id}>
//                 {cls.className} - {cls.section}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Teacher Dropdown */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Select Teacher</label>
//           <select
//             className="w-full border p-2 rounded"
//             {...register("teacherId", { required: true })}
//           >
//             <option value="">-- Select Teacher --</option>
//             {teachers.map((teacher) => (
//               <option key={teacher._id} value={teacher.userId?._id}>
//                 {teacher.userId.name} ({teacher.subject})
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
//         >
//           Assign
//         </button>

//         {message && <p className="mt-4 text-center font-medium">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default AssignTeacher;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

const AssignTeacher = () => {
  const { register, handleSubmit } = useForm();

  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState("");

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
      setMessage("");

      const selectedClass = classes.find((cls) => cls._id === data.classId);

      const teacherAssignedClass = classes.find(
        (cls) =>
          cls.classTeacher &&
          cls.classTeacher._id === data.teacherId &&
          cls._id !== data.classId,
      );

      if (selectedClass?.classTeacher) {
        const confirmReplace = window.confirm(
          `Class ${selectedClass.className}-${selectedClass.section} already has a teacher. Replace it?`,
        );
        if (!confirmReplace) return;
      }

      if (teacherAssignedClass) {
        const confirmReassign = window.confirm(
          `This teacher is already assigned to class ${teacherAssignedClass.className}-${teacherAssignedClass.section}. Reassign?`,
        );
        if (!confirmReassign) return;
      }

      await api.put("/admin/assign-class", {
        classId: data.classId,
        teacherUserId: data.teacherId,
      });

      setMessage("Teacher assigned successfully ✅");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">ACADEMIC MANAGEMENT</p>
        <h1 className="text-3xl font-bold">Assign Teacher</h1>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Class Dropdown */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Select Class
            </label>

            <div className="relative">
              <select
                className="w-full appearance-none p-3 pr-10 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("classId", { required: true })}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className} - {cls.section}
                  </option>
                ))}
              </select>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                ▼
              </div>
            </div>
          </div>

          {/* Teacher Dropdown */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Select Teacher
            </label>

            <div className="relative">
              <select
                className="w-full appearance-none p-3 pr-10 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                {...register("teacherId", { required: true })}
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher.userId?._id}>
                    {teacher.userId.name} ({teacher.subject})
                  </option>
                ))}
              </select>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                ▼
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-3 rounded-lg hover:bg-teal-800 transition"
          >
            Assign Teacher
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

export default AssignTeacher;
