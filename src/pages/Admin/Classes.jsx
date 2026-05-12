// import { useEffect, useMemo, useState } from "react";
// import api from "../../api/axios";
// import {
//   FaChalkboardTeacher,
//   FaSchool,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// const Classes = () => {
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const classesPerPage = 10;

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await api.get("/admin/get-all-classes");
//         setClasses(res.data.classes ?? []);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClasses();
//   }, []);

//   // Sort Classes
//   const sortedClasses = useMemo(() => {
//     return [...classes].sort((a, b) => {
//       const numA = parseInt(a.className.replace(/\D/g, "")) || 0;
//       const numB = parseInt(b.className.replace(/\D/g, "")) || 0;

//       if (numA === numB) {
//         return a.section.localeCompare(b.section);
//       }

//       return numA - numB;
//     });
//   }, [classes]);

//   // Pagination
//   const indexOfLast = currentPage * classesPerPage;
//   const indexOfFirst = indexOfLast - classesPerPage;

//   const currentClasses = sortedClasses.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(sortedClasses.length / classesPerPage);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <p className="text-lg text-gray-500 animate-pulse">
//           Loading Classes...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="mb-6 sm:mb-8">
//         <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
//           Academic Management
//         </p>

//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
//             All Classes
//           </h1>

//           {/* Quick Stats */}
//           <div className="flex flex-wrap gap-3">
//             <div className="bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3 flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
//                 <FaSchool />
//               </div>

//               <div>
//                 <p className="text-xs text-gray-500">Total Classes</p>

//                 <h3 className="font-bold text-gray-800">{classes.length}</h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[700px]">
//             {/* Head */}
//             <thead className="bg-gray-100 text-gray-600">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Class
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Section
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Class Teacher
//                 </th>
//               </tr>
//             </thead>

//             {/* Body */}
//             <tbody>
//               {currentClasses.length === 0 ? (
//                 <tr>
//                   <td colSpan="3" className="py-10 text-center text-gray-400">
//                     No Classes Found
//                   </td>
//                 </tr>
//               ) : (
//                 currentClasses.map((cls) => (
//                   <tr
//                     key={cls._id}
//                     className="border-t hover:bg-gray-50 transition"
//                   >
//                     {/* Class */}
//                     <td className="px-6 py-5">
//                       <div className="font-semibold text-gray-800">
//                         {cls.className}
//                       </div>
//                     </td>

//                     {/* Section */}
//                     <td className="px-6 py-5">
//                       <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
//                         Section {cls.section}
//                       </span>
//                     </td>

//                     {/* Teacher */}
//                     <td className="px-6 py-5">
//                       {cls.classTeacher ? (
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
//                             {cls.classTeacher.name?.charAt(0)}
//                           </div>

//                           <div>
//                             <p className="font-medium text-gray-800">
//                               {cls.classTeacher.name}
//                             </p>

//                             <p className="text-xs text-gray-500">
//                               Class Teacher
//                             </p>
//                           </div>
//                         </div>
//                       ) : (
//                         <span className="text-gray-400 italic">
//                           Not Assigned
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile Cards */}
//       <div className="grid grid-cols-1 gap-4 md:hidden">
//         {currentClasses.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-gray-400">
//             No Classes Found
//           </div>
//         ) : (
//           currentClasses.map((cls) => (
//             <div
//               key={cls._id}
//               className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5"
//             >
//               {/* Top */}
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-800">
//                     {cls.className}
//                   </h2>

//                   <span className="inline-block mt-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
//                     Section {cls.section}
//                   </span>
//                 </div>

//                 <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-teal-700">
//                   <FaSchool />
//                 </div>
//               </div>

//               {/* Teacher */}
//               <div className="border-t pt-4">
//                 {cls.classTeacher ? (
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
//                       {cls.classTeacher.name?.charAt(0)}
//                     </div>

//                     <div>
//                       <p className="font-medium text-gray-800">
//                         {cls.classTeacher.name}
//                       </p>

//                       <p className="text-xs text-gray-500 flex items-center gap-1">
//                         <FaChalkboardTeacher />
//                         Class Teacher
//                       </p>
//                     </div>
//                   </div>
//                 ) : (
//                   <p className="text-gray-400 italic">No Teacher Assigned</p>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
//         <p className="text-sm text-gray-500 text-center sm:text-left">
//           Showing <span className="font-semibold">{indexOfFirst + 1}</span> to{" "}
//           <span className="font-semibold">
//             {Math.min(indexOfLast, sortedClasses.length)}
//           </span>{" "}
//           of <span className="font-semibold">{sortedClasses.length}</span>{" "}
//           classes
//         </p>

//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => setCurrentPage((prev) => prev - 1)}
//             disabled={currentPage === 1}
//             className="
//               flex items-center gap-2
//               px-4 py-2
//               rounded-xl
//               border border-gray-300
//               bg-white
//               hover:bg-gray-100
//               disabled:opacity-50
//               disabled:cursor-not-allowed
//               transition
//             "
//           >
//             <FaChevronLeft />
//             Prev
//           </button>

//           <div className="px-4 py-2 bg-teal-700 text-white rounded-xl text-sm font-medium">
//             {currentPage} / {totalPages}
//           </div>

//           <button
//             onClick={() => setCurrentPage((prev) => prev + 1)}
//             disabled={currentPage === totalPages}
//             className="
//               flex items-center gap-2
//               px-4 py-2
//               rounded-xl
//               bg-teal-700
//               text-white
//               hover:bg-teal-800
//               disabled:opacity-50
//               disabled:cursor-not-allowed
//               transition
//             "
//           >
//             Next
//             <FaChevronRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Classes;

import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

import {
  FaChalkboardTeacher,
  FaSchool,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Search
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 10;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/admin/get-all-classes");

        setClasses(res.data.classes ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // Sort + Filter
  const filteredClasses = useMemo(() => {
    const sorted = [...classes].sort((a, b) => {
      const numA = parseInt(a.className.replace(/\D/g, "")) || 0;

      const numB = parseInt(b.className.replace(/\D/g, "")) || 0;

      if (numA === numB) {
        return a.section.localeCompare(b.section);
      }

      return numA - numB;
    });

    return sorted.filter((cls) => {
      const className = cls.className?.toLowerCase() || "";

      const section = cls.section?.toLowerCase() || "";

      const teacher = cls.classTeacher?.name?.toLowerCase() || "";

      const value = search.toLowerCase();

      return (
        className.includes(value) ||
        section.includes(value) ||
        teacher.includes(value)
      );
    });
  }, [classes, search]);

  // Pagination
  const indexOfLast = currentPage * classesPerPage;

  const indexOfFirst = indexOfLast - classesPerPage;

  const currentClasses = filteredClasses.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClasses.length / classesPerPage),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading Classes...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
          Academic Management
        </p>

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mt-2">
          {/* Left */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              All Classes
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Manage academic classes and class teachers
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"
              placeholder="Search class, section, teacher..."
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
        {/* Total Classes */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl">
            <FaSchool />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Classes</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {filteredClasses.length}
            </h2>
          </div>
        </div>

        {/* Assigned Teachers */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
            <FaChalkboardTeacher />
          </div>

          <div>
            <p className="text-sm text-gray-500">Assigned Teachers</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {filteredClasses.filter((c) => c.classTeacher).length}
            </h2>
          </div>
        </div>

        {/* Unassigned */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
            <FaUsers />
          </div>

          <div>
            <p className="text-sm text-gray-500">Unassigned Classes</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {filteredClasses.filter((c) => !c.classTeacher).length}
            </h2>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            {/* Head */}
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Class
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Section
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Class Teacher
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {currentClasses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-400">
                    No Classes Found
                  </td>
                </tr>
              ) : (
                currentClasses.map((cls) => (
                  <tr
                    key={cls._id}
                    className="border-t hover:bg-gray-50 transition"
                    onClick={() => navigate(`/admin/class/${cls._id}`)}
                  >
                    {/* Class */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                          {cls.className?.replace(/\D/g, "") || "C"}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {cls.className}
                          </p>

                          <p className="text-xs text-gray-500">
                            Academic Class
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Section */}
                    <td className="px-6 py-5">
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                        Section {cls.section}
                      </span>
                    </td>

                    {/* Teacher */}
                    <td className="px-6 py-5">
                      {cls.classTeacher ? (
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                            {cls.classTeacher.name?.charAt(0)}
                          </div>

                          <div>
                            <p className="font-medium text-gray-800">
                              {cls.classTeacher.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              Class Teacher
                            </p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">
                          Not Assigned
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      {cls.classTeacher ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {currentClasses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 text-center text-gray-400">
            No Classes Found
          </div>
        ) : (
          currentClasses.map((cls) => (
            <div
              key={cls._id}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-lg">
                    {cls.className?.replace(/\D/g, "") || "C"}
                  </div>

                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {cls.className}
                    </h2>

                    <span className="inline-block mt-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                      Section {cls.section}
                    </span>
                  </div>
                </div>

                {cls.classTeacher ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                    Pending
                  </span>
                )}
              </div>

              {/* Teacher */}
              <div className="mt-5 border-t pt-4">
                {cls.classTeacher ? (
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                      {cls.classTeacher.name?.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {cls.classTeacher.name}
                      </p>

                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <FaChalkboardTeacher />
                        Class Teacher
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No Teacher Assigned</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <p className="text-sm text-gray-500 text-center sm:text-left">
          Showing{" "}
          <span className="font-semibold">
            {filteredClasses.length === 0 ? 0 : indexOfFirst + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold">
            {Math.min(indexOfLast, filteredClasses.length)}
          </span>{" "}
          of <span className="font-semibold">{filteredClasses.length}</span>{" "}
          classes
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
            disabled={currentPage >= totalPages || filteredClasses.length === 0}
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

export default Classes;
