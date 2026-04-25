// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const Classes = () => {
//   const [classes, setClasses] = useState([]);

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const res = await api.get("/admin/get-all-classes");
//         setClasses(res.data.classes ?? []);
//       } catch (error) {
//         console.error("Error fetching classes:", error);
//       }
//     };

//     fetchClasses();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">All Classes</h1>

//       <div className="bg-white shadow rounded-lg overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Class</th>
//               <th className="p-3 text-left">Section</th>
//               <th className="p-3 text-left">Class Teacher</th>
//             </tr>
//           </thead>

//           <tbody>
//             {classes.length === 0 ? (
//               <tr>
//                 <td colSpan="3" className="p-4 text-center">
//                   No classes found
//                 </td>
//               </tr>
//             ) : (
//               classes.map((cls) => (
//                 <tr key={cls._id} className="border-t">
//                   <td className="p-3">{cls.className}</td>
//                   <td className="p-3">{cls.section}</td>
//                   <td className="p-3">
//                     {cls.classTeacher ? cls.classTeacher.name : "Not Assigned"}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Classes;

import { useEffect, useState } from "react";
import api from "../../api/axios";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // 🔥 SORT CLASSES (Grade 1 → Grade 10 → Section A/B)
  const sortedClasses = [...classes].sort((a, b) => {
    const numA = parseInt(a.className.replace(/\D/g, "")) || 0;
    const numB = parseInt(b.className.replace(/\D/g, "")) || 0;

    if (numA === numB) {
      return a.section.localeCompare(b.section);
    }

    return numA - numB;
  });

  // 📄 Pagination Logic
  const indexOfLast = currentPage * classesPerPage;
  const indexOfFirst = indexOfLast - classesPerPage;
  const currentClasses = sortedClasses.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedClasses.length / classesPerPage);

  if (loading) return <div className="p-6">Loading classes...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">ACADEMIC MANAGEMENT</p>
        <h1 className="text-3xl font-bold">All Classes</h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-[700px] w-full text-sm">
          {/* Head */}
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Section</th>
              <th className="p-4 text-left">Class Teacher</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {currentClasses.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-400">
                  No classes found
                </td>
              </tr>
            ) : (
              currentClasses.map((cls) => (
                <tr
                  key={cls._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Class */}
                  <td className="p-4 font-medium">{cls.className}</td>

                  {/* Section */}
                  <td className="p-4">
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">
                      {cls.section}
                    </span>
                  </td>

                  {/* Teacher */}
                  <td className="p-4">
                    {cls.classTeacher ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
                          {cls.classTeacher.name?.charAt(0)}
                        </div>
                        <span>{cls.classTeacher.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Not Assigned</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-teal-700 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classes;
