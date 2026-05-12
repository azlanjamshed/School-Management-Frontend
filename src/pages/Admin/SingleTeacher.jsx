import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import {
  FaChalkboardTeacher,
  FaBook,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaUserShield,
  FaIdBadge,
  FaCalendarAlt,
} from "react-icons/fa";

const SingleTeacher = () => {
  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await api.get(`/admin/teacher/${id}`);

        setTeacher(res.data.teacher);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading Teacher...
        </p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-red-500">Teacher not found</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
          Teacher Profile
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-2">
          {/* Left */}
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-3xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl font-bold shadow-sm">
              {teacher.userId?.name?.charAt(0)}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {teacher.userId?.name}
              </h1>

              <p className="text-gray-500 mt-2">@{teacher.userId?.username}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-3">
            <div
              className={`
                px-4 py-2 rounded-2xl text-sm font-medium
                ${
                  teacher.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {teacher.isActive ? "Active Teacher" : "Inactive Teacher"}
            </div>

            <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-2xl text-sm font-medium capitalize">
              {teacher.subject}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {/* Subject */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-2xl">
            <FaBook />
          </div>

          <div>
            <p className="text-sm text-gray-500">Subject</p>

            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {teacher.subject || "-"}
            </h2>
          </div>
        </div>

        {/* Experience */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
            <FaBriefcase />
          </div>

          <div>
            <p className="text-sm text-gray-500">Experience</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {teacher.experience ? `${teacher.experience} yrs` : "N/A"}
            </h2>
          </div>
        </div>

        {/* Qualification */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
            <FaGraduationCap />
          </div>

          <div>
            <p className="text-sm text-gray-500">Qualification</p>

            <h2 className="text-xl font-bold text-gray-800">
              {teacher.qualification || "N/A"}
            </h2>
          </div>
        </div>

        {/* Status */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
            <FaUserShield />
          </div>

          <div>
            <p className="text-sm text-gray-500">Account Status</p>

            <h2
              className={`text-xl font-bold ${
                teacher.userId?.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {teacher.userId?.isActive ? "Active" : "Inactive"}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left */}
        <div className="xl:col-span-2 space-y-6">
          {/* Teacher Details */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-700 to-cyan-600 p-6">
              <h2 className="text-white text-xl font-bold">Teacher Details</h2>

              <p className="text-teal-50 mt-1 text-sm">
                Professional and contact information
              </p>
            </div>

            {/* Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Subject */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                    <FaBook />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Subject</p>

                    <h3 className="font-bold text-gray-800 capitalize">
                      {teacher.subject || "N/A"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Qualification */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                    <FaGraduationCap />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Qualification</p>

                    <h3 className="font-bold text-gray-800">
                      {teacher.qualification || "N/A"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
                    <FaBriefcase />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Experience</p>

                    <h3 className="font-bold text-gray-800">
                      {teacher.experience
                        ? `${teacher.experience} years`
                        : "N/A"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                    <FaPhone />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>

                    <h3 className="font-bold text-gray-800">
                      {teacher.phone || "N/A"}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-gray-50 rounded-2xl p-5 md:col-span-2">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Address</p>

                    <h3 className="font-bold text-gray-800 mt-1">
                      {teacher.address || "No address available"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Top */}
            <div className="bg-gradient-to-r from-cyan-600 to-teal-700 p-8 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-4xl font-bold shadow-lg">
                {teacher.userId?.name?.charAt(0)}
              </div>

              <h2 className="text-white text-2xl font-bold mt-4">
                {teacher.userId?.name}
              </h2>

              <p className="text-cyan-100 mt-1 capitalize">
                {teacher.subject} Teacher
              </p>
            </div>

            {/* Bottom */}
            <div className="p-6 space-y-5">
              {/* Username */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <FaIdBadge />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Username</p>

                  <h3 className="font-semibold text-gray-800">
                    {teacher.userId?.username}
                  </h3>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                  <FaChalkboardTeacher />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Role</p>

                  <h3 className="font-semibold text-gray-800 capitalize">
                    {teacher.userId?.role}
                  </h3>
                </div>
              </div>

              {/* Joined */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                  <FaCalendarAlt />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Joined On</p>

                  <h3 className="font-semibold text-gray-800">
                    {new Date(teacher.createdAt).toLocaleDateString()}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
                <FaChalkboardTeacher />
              </div>

              <div>
                <p className="text-sm text-gray-500">Teaching Status</p>

                <h2 className="text-2xl font-bold text-gray-800">Active</h2>
              </div>
            </div>

            <div className="bg-gray-100 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Must Change Password</p>

              <h3 className="text-lg font-bold text-gray-800 mt-1">
                {teacher.userId?.mustChangePassword ? "Yes" : "No"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTeacher;
