import { Outlet } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const adminMenu = [
  { label: "Dashboard", path: "/admin" },
  { label: "Create Class", path: "/admin/create-class" },
  { label: "Create Teacher", path: "/admin/create-teacher" },
  { label: "Create Student", path: "/admin/create-student" },
  { label: "Students", path: "/admin/students" },
  { label: "Teachers", path: "/admin/teachers" },
  { label: "Classes", path: "/admin/classes" },
  { label: "Assign Teacher", path: "/admin/assign-teacher" },
];

const AdminLayout = () => {
  return (
    <Layout menuItems={adminMenu}>
      <Outlet />
    </Layout>
  );
};

export default AdminLayout;
