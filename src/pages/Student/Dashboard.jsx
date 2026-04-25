import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const response = axios.get("http://localhost:8080/api/student/profile", {
      withCredentials: true,
    });
    response.then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    // <div className="p-4">
    //   <h1 className="text-2xl font-bold">Student Dashboard</h1>
    //   {data && (
    //     <div className="mt-4">
    //       <p>Name: {data.student.userId.name}</p>
    //       <p>Class: {data.student.classId.className}</p>
    //       <p>Roll Number: {data.student.rollNumber}</p>
    //     </div>
    //   )}
    // </div>

    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🔷 Profile Header */}
      <div className="bg-teal-900 text-white rounded-3xl p-6 flex items-center justify-between shadow-lg">
        {/* Left */}
        {data && (
          <div className="flex items-center gap-6">
            {/* Profile Image */}
            <img
              src="https://i.pravatar.cc/150"
              alt="student"
              className="w-24 h-24 rounded-xl border-4 border-white"
            />

            {/* Info */}
            <div>
              <p className="text-sm bg-teal-700 inline-block px-3 py-1 rounded-full mb-2">
                ENROLLED STUDENT
              </p>

              <h1 className="text-3xl font-bold">{data.student.userId.name}</h1>

              <p className="text-sm mt-2 text-gray-200">
                {data.student.rollNumber}| {data.student.classId.className} |
                Session: 2023-24
              </p>
            </div>
          </div>
        )}

        {/* Right Button */}
        <button className="bg-teal-200 text-teal-900 px-4 py-2 rounded-lg font-medium hover:bg-teal-300">
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
