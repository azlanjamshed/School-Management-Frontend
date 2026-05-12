import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import {
  FaSchool,
  FaUsers,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClipboardCheck,
  FaBook,
} from "react-icons/fa";

const SingleClass = () => {
  const { id } = useParams();

  const [classData, setClassData] = useState(null);
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await api.get(`/admin/class/${id}`);

        setClassData(res.data.class);
        setStudents(res.data.students || []);
        setTotalStudents(res.data.totalStudents || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id]);

  // Average Attendance
  const averageAttendance = useMemo(() => {
    if (!students.length) return 0;

    const total = students.reduce(
      (acc, student) => acc + (student.attendance || 0),
      0,
    );

    return (total / students.length).toFixed(1);
  }, [students]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">Loading Class...</p>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-red-500">Class not found</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
          Academic Class
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-2">
          {/* Left */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl font-bold shadow-sm">
              {classData.className}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                Class {classData.className}-{classData.section}
              </h1>

              <p className="text-gray-500 mt-2">
                Academic class overview and student records
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-2xl text-sm font-medium">
              Active Class
            </div>

            <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-2xl text-sm font-medium">
              {totalStudents} Students
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {/* Total Students */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl">
            <FaUsers />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Students</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {totalStudents}
            </h2>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
            <FaClipboardCheck />
          </div>

          <div>
            <p className="text-sm text-gray-500">Avg Attendance</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {averageAttendance}%
            </h2>
          </div>
        </div>

        {/* Teacher */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
            <FaChalkboardTeacher />
          </div>

          <div>
            <p className="text-sm text-gray-500">Class Teacher</p>

            <h2 className="text-lg font-bold text-gray-800">
              {classData.classTeacher?.userId?.name || "N/A"}
            </h2>
          </div>
        </div>

        {/* Subject */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
            <FaBook />
          </div>

          <div>
            <p className="text-sm text-gray-500">Teacher Subject</p>

            <h2 className="text-xl font-bold text-gray-800 capitalize">
              {classData.classTeacher?.subject || "N/A"}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left */}
        <div className="xl:col-span-2 space-y-6">
          {/* Students */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-700 to-cyan-600 p-6">
              <h2 className="text-white text-xl font-bold">Students List</h2>

              <p className="text-teal-50 mt-1 text-sm">
                Students enrolled in this class
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[700px]">
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
                      Attendance
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-10 text-center text-gray-400"
                      >
                        No Students Found
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr
                        key={student._id}
                        className="border-t hover:bg-gray-50 transition"
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
                        <td className="px-6 py-5">
                          {student.userId?.username}
                        </td>

                        {/* Roll */}
                        <td className="px-6 py-5">
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                            #{student.rollNumber}
                          </span>
                        </td>

                        {/* Attendance */}
                        <td className="px-6 py-5">
                          <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium">
                            {student.attendance}%
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-4 p-5 md:hidden">
              {students.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-400">
                  No Students Found
                </div>
              ) : (
                students.map((student) => (
                  <div
                    key={student._id}
                    className="border border-gray-200 rounded-3xl p-5"
                  >
                    {/* Top */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                        {student.userId?.name?.charAt(0)}
                      </div>

                      <div className="flex-1">
                        <h2 className="font-bold text-lg text-gray-800">
                          {student.userId?.name}
                        </h2>

                        <p className="text-sm text-gray-500">
                          @{student.userId?.username}
                        </p>
                      </div>

                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                        #{student.rollNumber}
                      </span>
                    </div>

                    {/* Bottom */}
                    <div className="mt-5 border-t pt-4 flex items-center justify-between">
                      <p className="text-sm text-gray-500">Attendance</p>

                      <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-medium">
                        {student.attendance}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Teacher Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-teal-700 p-6">
              <h2 className="text-white text-xl font-bold">Class Teacher</h2>
            </div>

            {/* Body */}
            <div className="p-6">
              {classData.classTeacher ? (
                <>
                  {/* Avatar */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-3xl bg-teal-100 text-teal-700 flex items-center justify-center text-4xl font-bold shadow-sm">
                      {classData.classTeacher.userId?.name?.charAt(0)}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mt-4">
                      {classData.classTeacher.userId?.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      @{classData.classTeacher.userId?.username}
                    </p>

                    <span className="mt-3 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium capitalize">
                      {classData.classTeacher.subject}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-100 rounded-2xl p-4">
                      <p className="text-sm text-gray-500">Qualification</p>

                      <h3 className="font-bold text-gray-800 mt-1">
                        {classData.classTeacher.qualification}
                      </h3>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-4">
                      <p className="text-sm text-gray-500">Experience</p>

                      <h3 className="font-bold text-gray-800 mt-1">
                        {classData.classTeacher.experience} Years
                      </h3>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-4">
                      <p className="text-sm text-gray-500">Phone</p>

                      <h3 className="font-bold text-gray-800 mt-1">
                        {classData.classTeacher.phone}
                      </h3>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gray-100 text-gray-400 flex items-center justify-center text-3xl">
                    <FaChalkboardTeacher />
                  </div>

                  <p className="text-gray-500 mt-4">No Teacher Assigned</p>
                </div>
              )}
            </div>
          </div>

          {/* Class Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl">
                <FaSchool />
              </div>

              <div>
                <p className="text-sm text-gray-500">Class Details</p>

                <h2 className="text-2xl font-bold text-gray-800">
                  {classData.className}-{classData.section}
                </h2>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Created On</p>

              <h3 className="text-lg font-bold text-gray-800 mt-1">
                {new Date(classData.createdAt).toLocaleDateString()}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClass;
