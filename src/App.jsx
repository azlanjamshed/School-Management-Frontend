import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Teacher from "./pages/Teacher/Teacher";
import Student from "./pages/Student/StudentLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Student/Dashboard";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/Admin/AdminLayout";
import CreateClass from "./pages/Admin/CreateClass";
import CreateTeacher from "./pages/Admin/CreateTeacher";
import CreateStudent from "./pages/Admin/CreateStudent";
import Students from "./pages/Admin/Students";
import Teachers from "./pages/Admin/Teachers";
import Classes from "./pages/Admin/Classes";
import AssignTeacher from "./pages/Admin/AssignTeacher";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="create-class" element={<CreateClass />} />
          <Route path="create-teacher" element={<CreateTeacher />} />
          <Route path="create-student" element={<CreateStudent />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="classes" element={<Classes />} />
          <Route path="assign-teacher" element={<AssignTeacher />} />
        </Route>

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRole="teacher">
              <Teacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <Student />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          {/* <Route path="profile"  element={<Dashboard />} /> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
