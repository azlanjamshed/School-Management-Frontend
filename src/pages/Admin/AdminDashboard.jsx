// // import { useEffect, useState } from "react";
// // import api from "../../api/axios";

// // const AdminDashboard = () => {
// //   const [stats, setStats] = useState({
// //     students: 0,
// //     teachers: 0,
// //     classes: 0,
// //   });

// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       try {
// //         const [studentsRes, teachersRes, classesRes] = await Promise.all([
// //           api.get("/admin/get-all-students"),
// //           api.get("/admin/get-all-teachers"),
// //           api.get("/admin/get-all-classes"),
// //         ]);

// //         setStats({
// //           students: studentsRes.data.count,

// //           teachers: teachersRes.data.teachers.length,
// //           classes: classesRes.data.classes.length,
// //         });
// //       } catch (error) {
// //         console.error("Error fetching dashboard stats:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchStats();
// //   }, []);

// //   if (loading) {
// //     return <div>Loading dashboard...</div>;
// //   }

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <div className="bg-white p-6 rounded-lg shadow">
// //           <h2 className="text-lg font-semibold text-gray-600">
// //             Total Students
// //           </h2>
// //           <p className="text-3xl font-bold mt-2">{stats.students}</p>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow">
// //           <h2 className="text-lg font-semibold text-gray-600">
// //             Total Teachers
// //           </h2>
// //           <p className="text-3xl font-bold mt-2">{stats.teachers}</p>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow">
// //           <h2 className="text-lg font-semibold text-gray-600">Total Classes</h2>
// //           <p className="text-3xl font-bold mt-2">{stats.classes}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import StatCard from "../../components/dashboard/StatCard";
// import QuickActions from "../../components/dashboard/QuickActions";
// import ActivityPanel from "../../components/dashboard/ActivityPanel";
// import EnrollmentTable from "../../components/dashboard/EnrollmentTable";
// import { FaUsers, FaChalkboardTeacher, FaSchool } from "react-icons/fa";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     students: 0,
//     teachers: 0,
//     classes: 0,
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [studentsRes, teachersRes, classesRes] = await Promise.all([
//           api.get("/admin/get-all-students"),
//           api.get("/admin/get-all-teachers"),
//           api.get("/admin/get-all-classes"),
//         ]);

//         setStats({
//           students: studentsRes.data.count,
//           teachers: teachersRes.data.teachers.length,
//           classes: classesRes.data.classes.length,
//         });
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className=" bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <p className="text-sm text-gray-500">OVERVIEW DASHBOARD</p>
//         <h1 className="text-3xl font-bold">Institutional Health</h1>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
//         <StatCard
//           title="Total Students"
//           value={stats.students}
//           // badge="+12%"
//           icon={<FaUsers />}
//           color="bg-cyan-100 text-cyan-700"
//         />

//         <StatCard
//           title="Total Teachers"
//           value={stats.teachers}
//           // badge="Stable"
//           icon={<FaChalkboardTeacher />}
//           color="bg-teal-100 text-teal-700"
//         />

//         <StatCard
//           title="Active Classes"
//           value={stats.classes}
//           icon={<FaSchool />}
//           color="bg-yellow-100 text-yellow-700"
//         />
//       </div>

//       {/* Bottom Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <EnrollmentTable />
//         </div>

//         {/* <div className="space-y-6">
//           <QuickActions />
//           <ActivityPanel />
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useEffect, useState } from "react";
import api from "../../api/axios";
import StatCard from "../../components/admin/StatCard";
import QuickActions from "../../components/admin/QuickActions";
import ActivityPanel from "../../components/admin/ActivityPanel";
import EnrollmentTable from "../../components/admin/EnrollmentTable";

import { FaUsers, FaChalkboardTeacher, FaSchool } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, teachersRes, classesRes] = await Promise.all([
          api.get("/admin/get-all-students"),
          api.get("/admin/get-all-teachers"),
          api.get("/admin/get-all-classes"),
        ]);

        setStats({
          students: studentsRes.data.count,
          teachers: teachersRes.data.teachers.length,
          classes: classesRes.data.classes.length,
        });
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm tracking-widest text-gray-500 uppercase">
          Overview Dashboard
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Institutional Health
          </h1>

          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 w-fit">
            <p className="text-sm text-gray-500">Welcome Back 👋</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-4
          sm:gap-6
          mb-6
        "
      >
        <StatCard
          title="Total Students"
          value={stats.students}
          icon={<FaUsers />}
          color="bg-cyan-100 text-cyan-700"
        />

        <StatCard
          title="Total Teachers"
          value={stats.teachers}
          icon={<FaChalkboardTeacher />}
          color="bg-teal-100 text-teal-700"
        />

        <StatCard
          title="Active Classes"
          value={stats.classes}
          icon={<FaSchool />}
          color="bg-yellow-100 text-yellow-700"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* Table */}
        <div className="xl:col-span-2 overflow-hidden">
          <EnrollmentTable />
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <QuickActions />
          <ActivityPanel />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
