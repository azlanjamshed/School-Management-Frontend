// import { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../api/axios";

// import {
//   FaUserGraduate,
//   FaSchool,
//   FaClipboardCheck,
//   FaBook,
//   FaChartLine,
//   FaIdBadge,
//   FaUser,
// } from "react-icons/fa";
// import { useForm } from "react-hook-form";

// const SingleStudent = () => {
//   const { id } = useParams();

//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   useEffect(() => {
//     fetchStudent();
//   }, []);

//   const fetchStudent = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/admin/student/${id}`);

//       setStudent(res.data.student);

//       // Set default form values
//       reset({
//         name: res.data.student.userId?.name,
//         username: res.data.student.userId?.username,
//         phone: res.data.student.phone,
//         parentsName: res.data.student.parentsName,
//         rollNumber: res.data.student.rollNumber,
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       await api.put(`/admin/update-student/${id}`, data);
//       setEditMode(false);

//       fetchStudent();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // Calculate Average
//   const averageScore = useMemo(() => {
//     if (!student?.terms?.length) return 0;

//     let total = 0;
//     let count = 0;

//     student.terms.forEach((term) => {
//       term.subjects.forEach((sub) => {
//         total += sub.score;
//         count++;
//       });
//     });

//     return count ? (total / count).toFixed(1) : 0;
//   }, [student]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <p className="text-lg text-gray-500 animate-pulse">
//           Loading Student...
//         </p>
//       </div>
//     );
//   }

//   if (!student) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <p className="text-lg text-red-500">Student not found</p>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="w-full min-h-screen bg-gray-50">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8">
//           <div className=" flex justify-between items-center">
//             <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
//               Student Profile
//             </p>
//             {!editMode && (
//               <button
//                 onClick={() => setEditMode(true)}
//                 className="px-4 py-2 bg-teal-600 text-white rounded-xl"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-2">
//             {/* Left */}
//             <div className="flex items-center gap-5">
//               {/* Avatar */}
//               <div className="w-20 h-20 rounded-3xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl font-bold shadow-sm">
//                 {student.userId?.name?.charAt(0)}
//               </div>

//               {/* Info */}
//               <div>
//                 <div>
//                   {editMode ? (
//                     <input
//                       {...register("name", {
//                         required: "Name is required",
//                       })}
//                       className="w-full border p-3 rounded-xl"
//                     />
//                   ) : (
//                     <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
//                       {student.userId?.name}
//                     </h1>
//                   )}

//                   {errors.name && (
//                     <p className="text-red-500 text-sm">
//                       {errors.name.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   {editMode ? (
//                     <input
//                       {...register("username", {
//                         required: "Username is required",
//                       })}
//                       className="w-full border p-3 rounded-xl"
//                     />
//                   ) : (
//                     <p className="text-gray-500 mt-2">
//                       @{student.userId?.username}
//                     </p>
//                   )}
//                   {errors.username && (
//                     <p className="text-red-500 text-sm">
//                       {errors.username.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//             {/* Status */}
//             <div className="flex flex-wrap gap-3">
//               <div className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl text-sm font-medium">
//                 {student.userId?.isActive ? "Active Student" : "Inactive"}
//               </div>

//               <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-2xl text-sm font-medium">
//                 {editMode ? (
//                   <input
//                     {...register("rollNumber")}
//                     className="w-full border p-3 rounded-xl"
//                   />
//                 ) : (
//                   <span>Roll #{student.rollNumber}</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Top Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
//           {/* Class */}
//           <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
//             <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl">
//               <FaSchool />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Class</p>

//               <h2 className="text-2xl font-bold text-gray-800">
//                 {student.classId?.className} - {student.classId?.section}
//               </h2>
//             </div>
//           </div>

//           {/* Attendance */}
//           <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
//             <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
//               <FaClipboardCheck />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Attendance</p>

//               <h2 className="text-2xl font-bold text-gray-800">
//                 {student.attendance}%
//               </h2>
//             </div>
//           </div>

//           {/* Subjects */}
//           <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
//             <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
//               <FaBook />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Subjects</p>

//               <h2 className="text-2xl font-bold text-gray-800">
//                 {student.terms?.[0]?.subjects?.length || 0}
//               </h2>
//             </div>
//           </div>

//           {/* Average */}
//           <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
//             <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
//               <FaChartLine />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">Average Score</p>

//               <h2 className="text-2xl font-bold text-gray-800">
//                 {averageScore}%
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* Main Layout */}
//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//           {/* Left Section */}
//           <div className="xl:col-span-2 space-y-6">
//             {/* Academic Performance */}
//             <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
//               {/* Header */}
//               <div className="bg-gradient-to-r from-teal-700 to-cyan-600 p-6">
//                 <h2 className="text-white text-xl font-bold">
//                   Academic Performance
//                 </h2>

//                 <p className="text-teal-50 mt-1 text-sm">
//                   Subject wise performance overview
//                 </p>
//               </div>

//               {/* Terms */}
//               <div className="p-5 sm:p-6 space-y-6">
//                 {student.terms?.length === 0 ? (
//                   <p className="text-gray-400">No term records available</p>
//                 ) : (
//                   student.terms.map((term) => (
//                     <div
//                       key={term._id}
//                       className="border border-gray-200 rounded-2xl overflow-hidden"
//                     >
//                       {/* Term Header */}
//                       <div className="bg-gray-100 px-5 py-4">
//                         <h3 className="font-bold text-gray-800">
//                           {term.termName}
//                         </h3>
//                       </div>

//                       {/* Subjects */}
//                       <div className="p-5 space-y-4">
//                         {term.subjects.map((subject) => (
//                           <div key={subject._id} className="space-y-2">
//                             {/* Top */}
//                             <div className="flex items-center justify-between">
//                               <p className="font-medium text-gray-700">
//                                 {subject.subject}
//                               </p>

//                               <span className="text-sm font-bold text-gray-800">
//                                 {subject.score}%
//                               </span>
//                             </div>

//                             {/* Progress */}
//                             <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
//                               <div
//                                 className={`
//                                   h-full rounded-full
//                                   ${
//                                     subject.score >= 80
//                                       ? "bg-green-500"
//                                       : subject.score >= 60
//                                         ? "bg-yellow-500"
//                                         : "bg-red-500"
//                                   }
//                                 `}
//                                 style={{
//                                   width: `${subject.score}%`,
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="space-y-6">
//             {/* Student Info */}
//             <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
//               {/* Header */}
//               <div className="bg-gradient-to-r from-cyan-600 to-teal-700 p-6">
//                 <h2 className="text-white text-xl font-bold">
//                   Student Information
//                 </h2>
//               </div>

//               {/* Body */}
//               <div className="p-6 space-y-5">
//                 {/* Name */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-xl">
//                     <FaUserGraduate />
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">Full Name</p>

//                     <h3 className="font-semibold text-gray-800">
//                       {student.userId?.name}
//                     </h3>
//                   </div>
//                 </div>

//                 {/* Username */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl">
//                     <FaIdBadge />
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">Username</p>

//                     <h3 className="font-semibold text-gray-800">
//                       {student.userId?.username}
//                     </h3>
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 {student.phone && (
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-xl">
//                       <FaUser />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Phone</p>
//                       {editMode ? (
//                         <input
//                           {...register("phone")}
//                           className="w-full border p-3 rounded-xl"
//                         />
//                       ) : (
//                         <h3 className="font-semibold text-gray-800 capitalize">
//                           {student.phone}
//                         </h3>
//                       )}

//                       {/* <p className="text-sm text-gray-500">Phone</p>

//                       <h3 className="font-semibold text-gray-800 capitalize">
//                         {student.phone}
//                       </h3> */}
//                     </div>
//                   </div>
//                 )}

//                 {/* Role */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-xl">
//                     <FaUser />
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">Role</p>

//                     <h3 className="font-semibold text-gray-800 capitalize">
//                       {student.userId?.role}
//                     </h3>
//                   </div>
//                 </div>

//                 {/* Created */}
//                 <div className="pt-4 border-t">
//                   <p className="text-sm text-gray-500">Joined On</p>

//                   <h3 className="font-semibold text-gray-800 mt-1">
//                     {new Date(student.createdAt).toLocaleDateString()}
//                   </h3>
//                 </div>
//               </div>
//             </div>

//             {/* Class Card */}
//             <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
//               <div className="flex items-center gap-4 mb-5">
//                 <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
//                   <FaSchool />
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-500">Current Class</p>

//                   <h2 className="text-2xl font-bold text-gray-800">
//                     {student.classId?.className}-{student.classId?.section}
//                   </h2>
//                 </div>
//               </div>

//               <div className="bg-gray-100 rounded-2xl p-4">
//                 <p className="text-sm text-gray-500">Roll Number</p>

//                 <h3 className="text-xl font-bold text-gray-800 mt-1">
//                   #{student.rollNumber}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {editMode && (
//         <div className="flex gap-3 mt-6">
//           <button
//             type="submit"
//             className="px-5 py-3 bg-teal-600 text-white rounded-xl"
//           >
//             Update Student
//           </button>

//           <button
//             type="button"
//             onClick={() => {
//               setEditMode(false);

//               reset({
//                 name: student.userId?.name,
//                 username: student.userId?.username,
//                 phone: student.phone,
//                 parentName: student.parentName,
//                 rollNumber: student.rollNumber,
//               });
//             }}
//             className="px-5 py-3 border rounded-xl"
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </form>
//   );
// };

// export default SingleStudent;

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

import {
  FaUserGraduate,
  FaSchool,
  FaClipboardCheck,
  FaBook,
  FaChartLine,
  FaIdBadge,
  FaUser,
} from "react-icons/fa";

const SingleStudent = () => {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const inputStyle = `
    w-full
    rounded-2xl
    border border-gray-200
    bg-white
    px-4 py-3
    text-gray-800
    outline-none
    transition
    focus:ring-4
    focus:ring-teal-100
    focus:border-teal-500
  `;

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/admin/student/${id}`);

      const studentData = res.data.student;

      setStudent(studentData);

      reset({
        name: studentData.userId?.name || "",
        username: studentData.userId?.username || "",
        phone: studentData.phone || "",
        parentsName: studentData.parentsName || "",
        rollNumber: studentData.rollNumber || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await api.put(`/admin/update-student/${id}`, data);

      setEditMode(false);

      fetchStudent();
    } catch (error) {
      console.log(error);
    }
  };
  const toggleStudentStatus = async () => {
    try {
      const res = await api.put(`/admin/toggle-student-status/${id}`);

      setStudent(res.data.student);
    } catch (error) {
      console.log(error);
    }
  };
  const averageScore = useMemo(() => {
    if (!student?.terms?.length) return 0;

    let total = 0;
    let count = 0;

    student.terms.forEach((term) => {
      term.subjects.forEach((sub) => {
        total += sub.score;
        count++;
      });
    });

    return count ? (total / count).toFixed(1) : 0;
  }, [student]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading Student...
        </p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-red-500">Student not found</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full min-h-screen bg-gray-50 transition-all duration-300">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-base md:text-xl font-black tracking-widest uppercase  text-teal-400 ">
              Student Profile
            </h1>
            <div className="flex gap-5">
              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="
                  px-5 py-2.5
                  bg-teal-600
                  hover:bg-teal-700
                  text-white
                  rounded-2xl
                  transition
                "
                >
                  Edit
                </button>
              )}
              <button
                type="button"
                onClick={toggleStudentStatus}
                className={`
    px-5 py-2.5
    rounded-2xl
    text-white
    transition
    ${
      student.userId?.isActive
        ? "bg-red-500 hover:bg-red-600"
        : "bg-green-500 hover:bg-green-600"
    }
  `}
              >
                {student.userId?.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mt-5">
            {/* Left */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-10 justify-center items-center">
              {/* Avatar */}
              {/* <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-4xl font-bold shadow-sm">
                {student.userId?.name?.charAt(0)}
              </div> */}
              <div className="p-2 rounded-full bg-white shadow-md border border-gray-200">
                <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-4xl font-bold">
                  {student.userId?.name?.charAt(0)}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4 w-full flex flex-col items-center md:items-start  ">
                {/* Name */}
                <div>
                  {/* <p className="text-sm text-gray-500 mb-1">Full Name</p> */}

                  {editMode ? (
                    <input
                      {...register("name", {
                        required: "Name is required",
                      })}
                      className={inputStyle}
                    />
                  ) : (
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                      {student.userId?.name}
                    </h1>
                  )}

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div>
                  {/* <p className="text-sm text-gray-500 mb-1">Username</p> */}

                  {editMode ? (
                    <input
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className={inputStyle}
                    />
                  ) : (
                    <p className="text-lg text-gray-600">
                      @{student.userId?.username}
                    </p>
                  )}

                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-wrap gap-3">
              <div
                className={`min-h-[52px] flex items-center  text-green-700 px-5 py-3 rounded-2xl text-sm font-medium
                  ${student.userId?.isActive ? "bg-green-200" : "bg-red-200"}`}
              >
                <h2
                  className={`text-xl font-bold ${
                    student.userId?.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {student.userId?.isActive ? "Active" : "Inactive"}
                </h2>
              </div>

              <div className="min-h-[52px] flex items-center bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl text-sm font-medium">
                {editMode ? (
                  <input {...register("rollNumber")} className={inputStyle} />
                ) : (
                  <span>Roll #{student.rollNumber}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          {/* Class */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl">
              <FaSchool />
            </div>

            <div>
              <p className="text-sm text-gray-500">Class</p>

              <h2 className="text-2xl font-bold text-gray-800">
                {student.classId?.className} - {student.classId?.section}
              </h2>
            </div>
          </div>

          {/* Attendance */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
              <FaClipboardCheck />
            </div>

            <div>
              <p className="text-sm text-gray-500">Attendance</p>

              <h2 className="text-2xl font-bold text-gray-800">
                {student.attendance}%
              </h2>
            </div>
          </div>

          {/* Subjects */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
              <FaBook />
            </div>

            <div>
              <p className="text-sm text-gray-500">Subjects</p>

              <h2 className="text-2xl font-bold text-gray-800">
                {student.terms?.[0]?.subjects?.length || 0}
              </h2>
            </div>
          </div>

          {/* Average */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
              <FaChartLine />
            </div>

            <div>
              <p className="text-sm text-gray-500">Average Score</p>

              <h2 className="text-2xl font-bold text-gray-800">
                {averageScore}%
              </h2>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-700 to-cyan-600 p-6">
                <h2 className="text-white text-xl font-bold">
                  Academic Performance
                </h2>

                <p className="text-teal-50 mt-1 text-sm">
                  Subject wise performance overview
                </p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {student.terms?.length === 0 ? (
                  <p className="text-gray-400">No term records available</p>
                ) : (
                  student.terms.map((term) => (
                    <div
                      key={term._id}
                      className="border border-gray-200 rounded-2xl overflow-hidden"
                    >
                      {/* Term Header */}
                      <div className="bg-gray-100 px-5 py-4">
                        <h3 className="font-bold text-gray-800">
                          {term.termName}
                        </h3>
                      </div>

                      {/* Subjects */}
                      <div className="p-5 space-y-5">
                        {term.subjects.map((subject) => (
                          <div key={subject._id}>
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium text-gray-700">
                                {subject.subject}
                              </p>

                              <span className="text-sm font-bold text-gray-800">
                                {subject.score}%
                              </span>
                            </div>

                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div
                                className={`
                                  h-full rounded-full
                                  ${
                                    subject.score >= 80
                                      ? "bg-green-500"
                                      : subject.score >= 60
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }
                                `}
                                style={{
                                  width: `${subject.score}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Info */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-teal-700 p-6">
                <h2 className="text-white text-xl font-bold">
                  Student Information
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Full Name */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-xl">
                    <FaUserGraduate />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>

                    <h3 className="font-semibold text-gray-800">
                      {student.userId?.name}
                    </h3>
                  </div>
                </div>

                {/* Username */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl">
                    <FaIdBadge />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Username</p>

                    <h3 className="font-semibold text-gray-800">
                      @{student.userId?.username}
                    </h3>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-xl">
                    <FaUser />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Phone</p>

                    {editMode ? (
                      <input {...register("phone")} className={inputStyle} />
                    ) : (
                      <h3 className="font-semibold text-gray-800">
                        {student.phone || "-"}
                      </h3>
                    )}
                  </div>
                </div>

                {/* Parent */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl">
                    <FaUser />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Parent Name</p>

                    {editMode ? (
                      <input
                        {...register("parentsName")}
                        className={inputStyle}
                      />
                    ) : (
                      <h3 className="font-semibold text-gray-800">
                        {student.parentsName || "-"}
                      </h3>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-xl">
                    <FaUser />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">Role</p>

                    <h3 className="font-semibold text-gray-800 capitalize">
                      {student.userId?.role}
                    </h3>
                  </div>
                </div>

                {/* Joined */}
                <div className="pt-5 border-t">
                  <p className="text-sm text-gray-500">Joined On</p>

                  <h3 className="font-semibold text-gray-800 mt-1">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </h3>
                </div>
              </div>
            </div>

            {/* Class Card */}
            {/* <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
                  <FaSchool />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Current Class</p>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {student.classId?.className}-{student.classId?.section}
                  </h2>
                </div>
              </div>

              <div className="bg-gray-100 rounded-2xl p-5">
                <p className="text-sm text-gray-500">Roll Number</p>

                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  #{student.rollNumber}
                </h3>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Buttons */}
        {editMode && (
          <div className="sticky bottom-4 flex justify-end gap-3 mt-8">
            <button
              type="submit"
              className="
                px-6 py-3
                bg-teal-600
                hover:bg-teal-700
                text-white
                rounded-2xl
                transition
              "
            >
              Update Student
            </button>

            <button
              type="button"
              onClick={() => {
                setEditMode(false);

                reset({
                  name: student.userId?.name || "",
                  username: student.userId?.username || "",
                  phone: student.phone || "",
                  parentsName: student.parentsName || "",
                  rollNumber: student.rollNumber || "",
                });
              }}
              className="
                px-6 py-3
                border border-gray-300
                bg-white
                hover:bg-gray-100
                rounded-2xl
                transition
              "
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default SingleStudent;
