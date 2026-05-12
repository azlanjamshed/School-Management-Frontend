import { useEffect, useState } from "react";
import api from "../../api/axios";
import { NavLink, useNavigate } from "react-router-dom";

const EnrollmentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get("/admin/latest-enrollments");
        setStudents(res.data.students); // adjust based on your backend
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return <div className="p-4">Loading enrollments...</div>;
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm h-[90%] overflow-auto">
      <div className="flex justify-between items-center mb-4  sticky top-0 bg-white z-10 py-5">
        <h3 className="font-semibold">Latest Enrollments</h3>
        <NavLink to="/admin/students">
          <span className="text-sm text-teal-600 cursor-pointer">View All</span>
        </NavLink>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead className="text-gray-500 text-left">
          <tr>
            <th>Student</th>
            <th>Class</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              onClick={() => navigate(`/admin/student/${student._id}`)}
              key={student._id}
              className="border-t cursor-pointer hover:bg-teal-50 "
            >
              {/* Student */}
              <td className="py-3 ">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-teal-100  text-teal-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {student.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{student.userId.name}</p>
                    <p className="text-xs text-gray-500">
                      ID: {student._id.slice(-4)}
                    </p>
                  </div>
                </div>
              </td>

              {/* Class */}
              <td>{student.classId.className || "N/A"}</td>

              {/* Date */}
              <td>{new Date(student.createdAt).toLocaleDateString()}</td>

              {/* Status */}
              <td>
                <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                  Confirmed
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {students.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No recent enrollments</p>
      )}
    </div>
  );
};

export default EnrollmentTable;
