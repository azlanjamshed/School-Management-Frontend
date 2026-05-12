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
import { useForm } from "react-hook-form";

const SingleTeacher = () => {
  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const inputStyle = `
    w-full
    rounded-2xl
    border border-gray-200
    bg-white
    px-4 py-3
    text-gray-800
    outline-none
    transition
    focus:ring-4
    focus:ring-teal-100
    focus:border-teal-500
  `;

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const fetchTeacher = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/admin/teacher/${id}`);

      const teacherData = res.data.teacher;

      setTeacher(teacherData);

      reset({
        name: teacherData.userId?.name || "",
        username: teacherData.userId?.username || "",
        phone: teacherData.phone || "",
        subject: teacherData.subject || "",
        address: teacherData.address || "",
        qualification: teacherData.qualification || "",
        experience: teacherData.experience || "",
        isActive: teacherData.isActive || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = async (data) => {
    try {
      await api.put(`/admin/update-teacher/${id}`, data);

      setEditMode(false);

      fetchTeacher();
    } catch (error) {
      console.log(error);
    }
  };
  const toggleTeacherStatus = async () => {
    try {
      const res = await api.put(`/admin/toggle-teacher-status/${id}`);

      setTeacher(res.data.teacher);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const fetchTeacher = async () => {
  //     try {
  //       const res = await api.get(`/admin/teacher/${id}`);

  //       setTeacher(res.data.teacher);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTeacher();
  // }, [id]);

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full min-h-screen bg-gray-50">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          {/* <p className="text-xs sm:text-sm tracking-widest uppercase text-gray-500">
          Teacher Profile
        </p> */}
          <div className="flex items-center justify-between">
            <h1 className="text-base md:text-xl font-black tracking-widest uppercase  text-teal-400 ">
              Teacher Profile
            </h1>
            <div className="flex gap-5">
              {!editMode && (
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="
                  px-5 py-2.5
                  bg-teal-600
                  hover:bg-teal-700
                  text-white
                  rounded-2xl
                  transition
                "
                >
                  Edit
                </button>
              )}
              <button
                type="button"
                onClick={toggleTeacherStatus}
                className={`
    px-5 py-2.5
    rounded-2xl
    text-white
    transition
    ${
      teacher.userId?.isActive
        ? "bg-red-500 hover:bg-red-600"
        : "bg-green-500 hover:bg-green-600"
    }
  `}
              >
                {teacher.userId?.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-5">
            {/* Left */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-10 justify-center items-center">
              {/* Avatar */}
              {/* <div className="w-20 h-20 rounded-3xl bg-teal-100 text-teal-700 flex items-center justify-center text-3xl font-bold shadow-sm">
              {teacher.userId?.name?.charAt(0)}
            </div> */}
              <div className="p-2 rounded-full bg-white shadow-md border border-gray-200">
                <div className="w-20 h-20 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-4xl font-bold">
                  {teacher.userId?.name?.charAt(0)}
                </div>
              </div>

              {/* Info */}
              {/* <div >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {teacher.userId?.name}
              </h1>

              <p className="text-gray-500 mt-2">@{teacher.userId?.username}</p>
            </div> */}
              <div className="space-y-4 w-full flex flex-col items-center md:items-start  ">
                {/* Name */}
                <div>
                  {/* <p className="text-sm text-gray-500 mb-1">Full Name</p> */}

                  {editMode ? (
                    <input
                      {...register("name", {
                        required: "Name is required",
                      })}
                      className={inputStyle}
                    />
                  ) : (
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                      {teacher.userId?.name}
                    </h1>
                  )}

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div>
                  {/* <p className="text-sm text-gray-500 mb-1">Username</p> */}

                  {editMode ? (
                    <input
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className={inputStyle}
                    />
                  ) : (
                    <p className="text-lg text-gray-600">
                      @{teacher.userId?.username}
                    </p>
                  )}

                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Status */}
            {/* <div className="flex flex-wrap gap-3">
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
          </div> */}
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
              {editMode ? (
                <input {...register("subject")} className={inputStyle} />
              ) : (
                <>
                  <p className="text-sm text-gray-500">Subject</p>
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">
                    {teacher.subject || "-"}
                  </h2>
                </>
              )}
              {/* <p className="text-sm text-gray-500">Subject</p>

              <h2 className="text-2xl font-bold text-gray-800 capitalize">
                {teacher.subject || "-"}
              </h2> */}
            </div>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl">
              <FaBriefcase />
            </div>

            <div>
              {editMode ? (
                <input
                  {...register("experience", {
                    required: "experience is required",
                  })}
                  className={inputStyle}
                />
              ) : (
                <>
                  <p className="text-sm text-gray-500">Experience</p>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {teacher.experience ? `${teacher.experience} yrs` : "N/A"}
                  </h2>
                </>
              )}

              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
              {/* <p className="text-sm text-gray-500">Experience</p>

              <h2 className="text-2xl font-bold text-gray-800">
                {teacher.experience ? `${teacher.experience} yrs` : "N/A"}
              </h2> */}
            </div>
          </div>

          {/* Qualification */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
              <FaGraduationCap />
            </div>

            <div>
              {editMode ? (
                <input
                  {...register("qualification", {
                    required: "qualification is required",
                  })}
                  className={inputStyle}
                />
              ) : (
                <>
                  <p className="text-sm text-gray-500">Qualification</p>
                  <h2 className="text-xl font-bold text-gray-800">
                    {teacher.qualification || "N/A"}
                  </h2>
                </>
              )}
              {/* <p className="text-sm text-gray-500">Qualification</p>

              <h2 className="text-xl font-bold text-gray-800">
                {teacher.qualification || "N/A"}
              </h2> */}
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
                <h2 className="text-white text-xl font-bold">
                  Teacher Details
                </h2>

                <p className="text-teal-50 mt-1 text-sm">
                  Professional and contact information
                </p>
              </div>

              {/* Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Subject */}
                {/* <div className="bg-gray-50 rounded-2xl p-5">
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
                </div> */}

                {/* Qualification */}
                {/* <div className="bg-gray-50 rounded-2xl p-5">
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
                </div> */}

                {/* Experience */}
                {/* <div className="bg-gray-50 rounded-2xl p-5">
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
                </div> */}

                {/* Phone */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                      <FaPhone />
                    </div>

                    <div>
                      {editMode ? (
                        <input
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          className={inputStyle}
                        />
                      ) : (
                        <>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <h3 className="font-bold text-gray-800">
                            {teacher.phone || "N/A"}
                          </h3>
                        </>
                      )}
                      {/* <p className="text-sm text-gray-500">Phone Number</p>

                      <h3 className="font-bold text-gray-800">
                        {teacher.phone || "N/A"}
                      </h3> */}
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
                      {editMode ? (
                        <textarea
                          {...register("address")}
                          className={inputStyle}
                          rows={3}
                        />
                      ) : (
                        <h3 className="font-bold text-gray-800 mt-1">
                          {teacher.address || "No address available"}
                        </h3>
                      )}
                      {/* <p className="text-sm text-gray-500">Address</p>

                      <h3 className="font-bold text-gray-800 mt-1">
                        {teacher.address || "No address available"}
                      </h3> */}
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
            {/* <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
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
            </div> */}
          </div>
        </div>
        {editMode && (
          <div className="sticky bottom-4 flex justify-end gap-3 mt-8">
            <button
              type="submit"
              className="
                px-6 py-3
                bg-teal-600
                hover:bg-teal-700
                text-white
                rounded-2xl
                transition
              "
            >
              Update Teacher
            </button>

            <button
              type="button"
              onClick={() => {
                setEditMode(false);

                reset({
                  name: teacher.userId?.name || "",
                  username: teacher.userId?.username || "",
                  phone: teacher.phone || "",
                  subject: teacher.subject || "",
                  address: teacher.address || "",
                  qualification: teacher.qualification || "",
                  experience: teacher.experience || "",
                });
              }}
              className="
                px-6 py-3
                border border-gray-300
                bg-white
                hover:bg-gray-100
                rounded-2xl
                transition
              "
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default SingleTeacher;
