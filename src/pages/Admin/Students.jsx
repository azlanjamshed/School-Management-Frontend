// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// const Students = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await api.get("/admin/get-all-students");
//         console.log("FULL RESPONSE:", res.data);
//         setStudents(res.data.student ?? []);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   if (loading) return <div>Loading students...</div>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">All Students</h1>

//       <div className="bg-white shadow rounded-lg overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Username</th>
//               <th className="p-3 text-left">Roll No</th>
//               <th className="p-3 text-left">Class</th>
//               <th className="p-3 text-left">Parent</th>
//               <th className="p-3 text-left">Phone</th>
//             </tr>
//           </thead>

//           <tbody>
//             {students.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center">
//                   No students found
//                 </td>
//               </tr>
//             ) : (
//               students.map((student) => (
//                 <tr key={student._id} className="border-t hover:bg-gray-50">
//                   <td className="p-3">{student.userId.name}</td>
//                   <td className="p-3">{student.userId.username || "-"}</td>
//                   <td className="p-3">{student.rollNumber}</td>
//                   <td className="p-3">
//                     {student.classId
//                       ? `${student.classId.className} - ${student.classId.section}`
//                       : "-"}
//                   </td>
//                   <td className="p-3">{student.parentName}</td>
//                   <td className="p-3">{student.phone}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Students;

import { useEffect, useState } from "react";
import api from "../../api/axios";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  // 🔍 Filter by class
  // const filteredStudents = selectedClass
  //   ? students.filter((s) => s.classId?._id === selectedClass)
  //   : students;
  const filteredStudents = students.filter((student) => {
    const matchesClass = selectedClass
      ? student.classId?._id === selectedClass
      : true;

    const name = student.userId.name?.toLowerCase() || "";
    const username = student.userId.username?.toLowerCase() || "";
    const roll = String(student.rollNumber || "").toLowerCase();

    const searchValue = search.toLowerCase();
    const matchesSearch =
      name.includes(searchValue) ||
      username.includes(searchValue) ||
      roll.includes(searchValue);

    return matchesClass && matchesSearch;
  });

  // 📄 Pagination logic
  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const selectedClassData = classes.find((cls) => cls._id === selectedClass);
  if (loading) return <div className="p-6">Loading students...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <p className="text-sm text-gray-500">STUDENT MANAGEMENT</p>
          <h1 className="text-3xl font-bold">All Students</h1>
        </div>

        Filter Dropdown
        <select
          className="p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.className} - {cls.section}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <p className="text-sm text-gray-500">STUDENT MANAGEMENT</p>

          <h1 className="text-3xl font-bold">
            {selectedClassData
              ? `${selectedClassData.className} - ${selectedClassData.section} Students`
              : "All Students"}
          </h1>
        </div>

        Dropdown
        <select
          className="p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.className} - {cls.section}
            </option>
          ))}
        </select>
      </div> */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        {/* Left */}
        <div>
          <p className="text-sm text-gray-500">STUDENT MANAGEMENT</p>

          <h1 className="text-3xl font-bold">
            {selectedClassData
              ? `${selectedClassData.className} - ${selectedClassData.section} Students`
              : "All Students"}
          </h1>
        </div>

        {/* Right (Search + Dropdown) */}
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search name, username, roll..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="p-3 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-teal-500"
          />

          {/* Class Filter */}
          <select
            className="p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500"
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setCurrentPage(1);
            }}
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

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Roll</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Parent</th>
              <th className="p-4 text-left">Phone</th>
            </tr>
          </thead>

          <tbody>
            {currentStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400">
                  No students found
                </td>
              </tr>
            ) : (
              currentStudents.map((student) => (
                <tr
                  key={student._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Name + Avatar */}
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
                      {student.userId.name?.charAt(0)}
                    </div>
                    <span>{student.userId.name}</span>
                  </td>

                  <td className="p-4">{student.userId.username || "-"}</td>

                  <td className="p-4">{student.rollNumber}</td>

                  <td className="p-4">
                    {student.classId
                      ? `${student.classId.className} - ${student.classId.section}`
                      : "-"}
                  </td>

                  <td className="p-4">{student.parentName || "-"}</td>

                  <td className="p-4">{student.phone || "-"}</td>
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

export default Students;
