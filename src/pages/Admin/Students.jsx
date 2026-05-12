// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const Students = () => {
//   const [students, setStudents] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const studentsPerPage = 10;

//   useEffect(() => {
//     fetchStudents();
//     fetchClasses();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const res = await api.get("/admin/get-all-students");
//       setStudents(res.data.student ?? []);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchClasses = async () => {
//     try {
//       const res = await api.get("/admin/get-all-classes");
//       setClasses(res.data.classes);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // 🔍 Filter by class
//   // const filteredStudents = selectedClass
//   //   ? students.filter((s) => s.classId?._id === selectedClass)
//   //   : students;
//   const filteredStudents = students.filter((student) => {
//     const matchesClass = selectedClass
//       ? student.classId?._id === selectedClass
//       : true;

//     const name = student.userId.name?.toLowerCase() || "";
//     const username = student.userId.username?.toLowerCase() || "";
//     const roll = String(student.rollNumber || "").toLowerCase();

//     const searchValue = search.toLowerCase();
//     const matchesSearch =
//       name.includes(searchValue) ||
//       username.includes(searchValue) ||
//       roll.includes(searchValue);

//     return matchesClass && matchesSearch;
//   });

//   // 📄 Pagination logic
//   const indexOfLast = currentPage * studentsPerPage;
//   const indexOfFirst = indexOfLast - studentsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
//   const selectedClassData = classes.find((cls) => cls._id === selectedClass);
//   if (loading) return <div className="p-6">Loading students...</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
//         {/* Left */}
//         <div>
//           <p className="text-sm text-gray-500">STUDENT MANAGEMENT</p>

//           <h1 className="text-3xl font-bold">
//             {selectedClassData
//               ? `${selectedClassData.className} - ${selectedClassData.section} Students`
//               : "All Students"}
//           </h1>
//         </div>

//         {/* Right (Search + Dropdown) */}
//         <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
//           {/* Search */}
//           <input
//             type="text"
//             placeholder="Search name, username, roll..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//             className="p-3 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-teal-500"
//           />

//           {/* Class Filter */}
//           <select
//             className="p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
//             value={selectedClass}
//             onChange={(e) => {
//               setSelectedClass(e.target.value);
//               setCurrentPage(1);
//             }}
//           >
//             <option value="">All Classes</option>
//             {classes.map((cls) => (
//               <option key={cls._id} value={cls._id}>
//                 {cls.className} - {cls.section}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
//         <table className="min-w-[800px] w-full text-sm">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="p-4 text-left">Student</th>
//               <th className="p-4 text-left">Username</th>
//               <th className="p-4 text-left">Roll</th>
//               <th className="p-4 text-left">Class</th>
//               <th className="p-4 text-left">Parent</th>
//               <th className="p-4 text-left">Phone</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentStudents.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="p-6 text-center text-gray-400">
//                   No students found
//                 </td>
//               </tr>
//             ) : (
//               currentStudents.map((student) => (
//                 <tr
//                   key={student._id}
//                   className="border-t hover:bg-gray-50 transition"
//                 >
//                   {/* Name + Avatar */}
//                   <td className="p-4 flex items-center gap-3">
//                     <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
//                       {student.userId.name?.charAt(0)}
//                     </div>
//                     <span>{student.userId.name}</span>
//                   </td>

//                   <td className="p-4">{student.userId.username || "-"}</td>

//                   <td className="p-4">{student.rollNumber}</td>

//                   <td className="p-4">
//                     {student.classId
//                       ? `${student.classId.className} - ${student.classId.section}`
//                       : "-"}
//                   </td>

//                   <td className="p-4">{student.parentName || "-"}</td>

//                   <td className="p-4">{student.phone || "-"}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-6">
//         <p className="text-sm text-gray-500">
//           Page {currentPage} of {totalPages}
//         </p>

//         <div className="flex gap-2">
//           <button
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
//           >
//             Prev
//           </button>

//           <button
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-teal-700 text-white rounded-lg disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Students;

import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

import {
  FaUserGraduate,
  FaSearch,
  FaSchool,
  FaPhone,
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/admin/get-all-students");
      setStudents(res.data.student ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await api.get("/admin/get-all-classes");
      setClasses(res.data.classes);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter Students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesClass = selectedClass
        ? student.classId?._id === selectedClass
        : true;

      const name = student.userId?.name?.toLowerCase() || "";

      const username = student.userId?.username?.toLowerCase() || "";

      const roll = String(student.rollNumber || "").toLowerCase();

      const searchValue = search.toLowerCase();

      const matchesSearch =
        name.includes(searchValue) ||
        username.includes(searchValue) ||
        roll.includes(searchValue);

      return matchesClass && matchesSearch;
    });
  }, [students, selectedClass, search]);

  // Pagination
  const indexOfLast = currentPage * studentsPerPage;

  const indexOfFirst = indexOfLast - studentsPerPage;

  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  // const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage),
  );

  const selectedClassData = classes.find((cls) => cls._id === selectedClass);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading Students...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
          Student Management
        </p>

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mt-2">
          {/* Left */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
              {selectedClassData
                ? `${selectedClassData.className} - ${selectedClassData.section} Students`
                : "All Students"}
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Manage and monitor student records
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="
                  w-full
                  pl-11 pr-4 py-3
                  bg-white
                  border border-gray-200
                  rounded-2xl
                  outline-none
                  focus:ring-4
                  focus:ring-teal-100
                  focus:border-teal-500
                  transition
                "
              />
            </div>

            {/* Class Filter */}
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setCurrentPage(1);
              }}
              className="
                px-4 py-3
                bg-white
                border border-gray-200
                rounded-2xl
                outline-none
                focus:ring-4
                focus:ring-teal-100
                focus:border-teal-500
                transition
                min-w-[220px]
              "
            >
              <option value="">All Classes</option>

              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className} - {cls.section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {/* Total Students */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl">
            <FaUserGraduate />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Students</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {filteredStudents.length}
            </h2>
          </div>
        </div>

        {/* Selected Class */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
            <FaSchool />
          </div>

          <div>
            <p className="text-sm text-gray-500">Selected Class</p>

            <h2 className="text-lg font-bold text-gray-800">
              {selectedClassData
                ? `${selectedClassData.className} - ${selectedClassData.section}`
                : "All Classes"}
            </h2>
          </div>
        </div>

        {/* Parents */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
            <FaUsers />
          </div>

          <div>
            <p className="text-sm text-gray-500">Parent Contacts</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {filteredStudents.filter((s) => s.phone).length}
            </h2>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            {/* Head */}
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Username
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Roll
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Parent
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Phone
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {currentStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-400">
                    No Students Found
                  </td>
                </tr>
              ) : (
                currentStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="border-t hover:bg-gray-50 transition"
                    onClick={() => navigate(`/admin/student/${student._id}`)}
                  >
                    {/* Student */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                          {student.userId?.name?.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {student.userId?.name}
                          </p>

                          <p className="text-xs text-gray-500">Student</p>
                        </div>
                      </div>
                    </td>

                    {/* Username */}
                    <td className="px-6 py-5 text-gray-700">
                      {student.userId?.username || "-"}
                    </td>

                    {/* Roll */}
                    <td className="px-6 py-5">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                        #{student.rollNumber}
                      </span>
                    </td>

                    {/* Class */}
                    <td className="px-6 py-5">
                      {student.classId ? (
                        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                          {student.classId.className} -{" "}
                          {student.classId.section}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Parent */}
                    <td className="px-6 py-5">{student.parentName || "-"}</td>

                    {/* Phone */}
                    <td className="px-6 py-5">{student.phone || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {currentStudents.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center text-gray-400">
            No Students Found
          </div>
        ) : (
          currentStudents.map((student) => (
            <div
              key={student._id}
              className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                    {student.userId?.name?.charAt(0)}
                  </div>

                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {student.userId?.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {student.userId?.username}
                    </p>
                  </div>
                </div>

                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold">
                  #{student.rollNumber}
                </span>
              </div>

              {/* Info */}
              <div className="mt-5 space-y-3">
                {/* Class */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Class</p>

                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                    {student.classId
                      ? `${student.classId.className} - ${student.classId.section}`
                      : "-"}
                  </span>
                </div>

                {/* Parent */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Parent</p>

                  <p className="font-medium text-gray-800">
                    {student.parentName || "-"}
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaPhone />
                    Phone
                  </p>

                  <p className="font-medium text-gray-800">
                    {student.phone || "-"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold">{indexOfFirst + 1}</span> to{" "}
          <span className="font-semibold">
            {Math.min(indexOfLast, filteredStudents.length)}
          </span>{" "}
          of <span className="font-semibold">{filteredStudents.length}</span>{" "}
          students
        </p>

        <div className="flex items-center gap-3">
          {/* <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl
              border border-gray-300
              bg-white
              hover:bg-gray-100
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
            "
          >
            <FaChevronLeft />
            Prev
          </button> */}

          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="
    flex items-center gap-2
    px-4 py-2
    rounded-xl
    border border-gray-300
    bg-white
    hover:bg-gray-100
    disabled:opacity-50
    disabled:cursor-not-allowed
    transition
  "
          >
            <FaChevronLeft />
            Prev
          </button>
          <div className="px-4 py-2 bg-teal-700 text-white rounded-xl text-sm font-medium">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={
              currentPage >= totalPages || filteredStudents.length === 0
            }
            className="
    flex items-center gap-2
    px-4 py-2
    rounded-xl
    bg-teal-700
    text-white
    hover:bg-teal-800
    disabled:opacity-50
    disabled:cursor-not-allowed
    transition
  "
          >
            Next
            <FaChevronRight />
          </button>
          {/* <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-xl
              bg-teal-700
              text-white
              hover:bg-teal-800
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
            "
          >
            Next
            <FaChevronRight />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Students;
