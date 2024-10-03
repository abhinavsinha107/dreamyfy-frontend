import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./pages/Homepage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegsiterPage";
import ChooseUser from "./pages/ChooseUser";
import { RootState } from "./redux/store";
import BecomeATutor from "./pages/BecomeATutor";
import TutorsCourses from "./components/TutorsGrid/TutorsCourses.tsx";
import JoinUsForm from "./components/JoinUs/JoinUsForm.tsx";

const App = () => {
  const role = useSelector((state: RootState) => state.user.user?.role);

  return (
    <>
      {!role && (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/become-a-tutor" element={<BecomeATutor />} />
          <Route path="/join-us-form" element={<JoinUsForm/>} />
          <Route path="/subject/:subject" element={<TutorsCourses />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {role === "ADMIN" && <AdminDashboard />}

      {role === "STUDENT" && <StudentDashboard />}

      {role === "TEACHER" && <TeacherDashboard />}
    </>
  );
};

export default App;
