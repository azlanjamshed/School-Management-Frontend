import Layout from "../../components/layout/Layout";

const teacherMenu = [
  { label: "Dashboard", path: "/teacher" },
  { label: "Dashboard", path: "/teacher/my-students" },
  { label: "Create Class", path: "/teacher/add-marks/:studentId" },
  { label: "Students", path: "/teacher/update-attendance/:studentId" },
];

const Teacher = () => {
  return (
    <Layout menuItems={teacherMenu}>
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
    </Layout>
  );
};

export default Teacher;
