// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const Teachers = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const teachersPerPage = 10;

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await api.get("/admin/get-all-teachers");
//         setTeachers(res.data.teachers);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   // 🔍 Search filter
//   const filteredTeachers = teachers.filter((teacher) => {
//     const name = teacher.userId.name?.toLowerCase() || "";
//     const subject = teacher.subject?.toLowerCase() || "";

//     return (
//       name.includes(search.toLowerCase()) ||
//       subject.includes(search.toLowerCase())
//     );
//   });

//   // 📄 Pagination logic
//   const indexOfLast = currentPage * teachersPerPage;
//   const indexOfFirst = indexOfLast - teachersPerPage;
//   const currentTeachers = filteredTeachers.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

//   if (loading) return <div className="p-6">Loading teachers...</div>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
//         <div>
//           <p className="text-sm text-gray-500">STAFF MANAGEMENT</p>
//           <h1 className="text-3xl font-bold">All Teachers</h1>
//         </div>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search by name or subject..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="p-3 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-teal-500"
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
//         <table className="min-w-[800px] w-full text-sm">
//           <thead className="bg-gray-100 text-gray-600">
//             <tr>
//               <th className="p-4 text-left">Teacher</th>
//               <th className="p-4 text-left">Username</th>
//               <th className="p-4 text-left">Subject</th>
//               <th className="p-4 text-left">Qualification</th>
//               <th className="p-4 text-left">Experience</th>
//               <th className="p-4 text-left">Phone</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentTeachers.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="p-6 text-center text-gray-400">
//                   No teachers found
//                 </td>
//               </tr>
//             ) : (
//               currentTeachers.map((teacher) => (
//                 <tr
//                   key={teacher._id}
//                   className="border-t hover:bg-gray-50 transition"
//                 >
//                   <td className="p-4 flex items-center gap-3">
//                     <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
//                       {teacher.userId.name?.charAt(0)}
//                     </div>
//                     <span>{teacher.userId.name}</span>
//                   </td>

//                   <td className="p-4">{teacher.userId.username || "-"}</td>

//                   <td className="p-4">
//                     <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">
//                       {teacher.subject}
//                     </span>
//                   </td>

//                   <td className="p-4">{teacher.qualification || "-"}</td>

//                   <td className="p-4">
//                     {teacher.experience ? `${teacher.experience} yrs` : "-"}
//                   </td>

//                   <td className="p-4">{teacher.phone || "-"}</td>
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

// export default Teachers;

import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

import {
  FaChalkboardTeacher,
  FaSearch,
  FaBook,
  FaPhone,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaBriefcase,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 10;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.get("/admin/get-all-teachers");

        setTeachers(res.data.teachers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Search Filter
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const name = teacher.userId?.name?.toLowerCase() || "";

      const subject = teacher.subject?.toLowerCase() || "";

      const searchValue = search.toLowerCase();

      return name.includes(searchValue) || subject.includes(searchValue);
    });
  }, [teachers, search]);

  // Pagination
  const indexOfLast = currentPage * teachersPerPage;

  const indexOfFirst = indexOfLast - teachersPerPage;

  const currentTeachers = filteredTeachers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTeachers.length / teachersPerPage),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading Teachers...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
          Staff Management
        </p>

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mt-2">
          {/* Left */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              All Teachers
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Manage faculty members and teaching staff
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"
              placeholder="Search by name or subject..."
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
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {/* Total Teachers */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl">
            <FaChalkboardTeacher />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Teachers</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {filteredTeachers.length}
            </h2>
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
            <FaBook />
          </div>

          <div>
            <p className="text-sm text-gray-500">Subjects</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {[...new Set(filteredTeachers.map((t) => t.subject))].length}
            </h2>
          </div>
        </div>

        {/* Experienced */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
            <FaBriefcase />
          </div>

          <div>
            <p className="text-sm text-gray-500">Experienced Teachers</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {filteredTeachers.filter((t) => t.experience >= 5).length}
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
                  Teacher
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Username
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Qualification
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Experience
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Phone
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {currentTeachers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-400">
                    No Teachers Found
                  </td>
                </tr>
              ) : (
                currentTeachers.map((teacher) => (
                  <tr
                    key={teacher._id}
                    className="border-t hover:bg-gray-50 transition"
                    onClick={() => navigate(`/admin/teacher/${teacher._id}`)}
                  >
                    {/* Teacher */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                          {teacher.userId?.name?.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {teacher.userId?.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            Faculty Member
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Username */}
                    <td className="px-6 py-5 text-gray-700">
                      {teacher.userId?.username || "-"}
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-5">
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                        {teacher.subject}
                      </span>
                    </td>

                    {/* Qualification */}
                    <td className="px-6 py-5">
                      {teacher.qualification || "-"}
                    </td>

                    {/* Experience */}
                    <td className="px-6 py-5">
                      {teacher.experience ? (
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                          {teacher.experience} yrs
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-5">{teacher.phone || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {currentTeachers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center text-gray-400">
            No Teachers Found
          </div>
        ) : (
          currentTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-white rounded-3xl shadow-sm border border-gray-200 p-5"
            >
              {/* Top */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                  {teacher.userId?.name?.charAt(0)}
                </div>

                <div className="flex-1">
                  <h2 className="font-bold text-lg text-gray-800">
                    {teacher.userId?.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {teacher.userId?.username}
                  </p>

                  <span className="inline-block mt-2 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                    {teacher.subject}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-5 space-y-3">
                {/* Qualification */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaGraduationCap />
                    Qualification
                  </p>

                  <p className="font-medium text-gray-800">
                    {teacher.qualification || "-"}
                  </p>
                </div>

                {/* Experience */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaBriefcase />
                    Experience
                  </p>

                  <p className="font-medium text-gray-800">
                    {teacher.experience ? `${teacher.experience} yrs` : "-"}
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaPhone />
                    Phone
                  </p>

                  <p className="font-medium text-gray-800">
                    {teacher.phone || "-"}
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
            {Math.min(indexOfLast, filteredTeachers.length)}
          </span>{" "}
          of <span className="font-semibold">{filteredTeachers.length}</span>{" "}
          teachers
        </p>

        <div className="flex items-center gap-3">
          {/* Prev */}
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

          {/* Page */}
          <div className="px-4 py-2 bg-teal-700 text-white rounded-xl text-sm font-medium">
            {currentPage} / {totalPages}
          </div>

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={
              currentPage >= totalPages || filteredTeachers.length === 0
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
        </div>
      </div>
    </div>
  );
};

export default Teachers;
