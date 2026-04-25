// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const Teachers = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await api.get("/admin/get-all-teachers");
//         setTeachers(res.data.teachers);
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   if (loading) return <div>Loading teachers...</div>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">All Teachers</h1>

//       <div className="bg-white shadow rounded-lg overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Username</th>
//               <th className="p-3 text-left">Subject</th>
//               <th className="p-3 text-left">Qualification</th>
//               <th className="p-3 text-left">Experience</th>
//               <th className="p-3 text-left">Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teachers.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center">
//                   No teachers found
//                 </td>
//               </tr>
//             ) : (
//               teachers.map((teacher) => (
//                 <tr key={teacher._id} className="border-t hover:bg-gray-50">
//                   <td className="p-3">{teacher.userId.name}</td>
//                   <td className="p-3">{teacher.userId.username || "-"}</td>
//                   <td className="p-3">{teacher.subject}</td>
//                   <td className="p-3">{teacher.qualification}</td>
//                   <td className="p-3">{teacher.experience} yrs</td>
//                   <td className="p-3">{teacher.phone}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Teachers;

import { useEffect, useState } from "react";
import api from "../../api/axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

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

  // 🔍 Search filter
  const filteredTeachers = teachers.filter((teacher) => {
    const name = teacher.userId.name?.toLowerCase() || "";
    const subject = teacher.subject?.toLowerCase() || "";

    return (
      name.includes(search.toLowerCase()) ||
      subject.includes(search.toLowerCase())
    );
  });

  // 📄 Pagination logic
  const indexOfLast = currentPage * teachersPerPage;
  const indexOfFirst = indexOfLast - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  if (loading) return <div className="p-6">Loading teachers...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <p className="text-sm text-gray-500">STAFF MANAGEMENT</p>
          <h1 className="text-3xl font-bold">All Teachers</h1>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or subject..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="p-3 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Teacher</th>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Qualification</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Phone</th>
            </tr>
          </thead>

          <tbody>
            {currentTeachers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  No teachers found
                </td>
              </tr>
            ) : (
              currentTeachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {teacher.userId.name?.charAt(0)}
                    </div>
                    <span>{teacher.userId.name}</span>
                  </td>

                  <td className="p-4">{teacher.userId.username || "-"}</td>

                  <td className="p-4">
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs">
                      {teacher.subject}
                    </span>
                  </td>

                  <td className="p-4">{teacher.qualification || "-"}</td>

                  <td className="p-4">
                    {teacher.experience ? `${teacher.experience} yrs` : "-"}
                  </td>

                  <td className="p-4">{teacher.phone || "-"}</td>
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

export default Teachers;
