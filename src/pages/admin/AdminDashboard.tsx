import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppBar, Drawer } from "../../components/styles";
import Logout from "../Logout";
import SideBar from "./SideBar";
import AdminProfile from "./AdminProfile";
import AdminHomePage from "./AdminHomePage";
import ShowSubjects from "./subjectRelated/ShowSubjects";
import ChooseClass from "./teacherRelated/ChooseClass";
import AddClass from "./classRelated/AddClass";
import ShowClasses from "./classRelated/ShowClasses";
import TeacherClassDetails from "../teacher/TeacherCourseDetails";
import AccountMenu from "../../components/AccountMenu";
import LogoUpload from "./logoUpload.tsx";
import AdminChat from "./AdminChat.tsx";
import InvestmentRequests from "./InvestingRequests.tsx";
import { color } from "framer-motion";
import EditCourseForm from "../teacher/EditCourseForm.tsx";


const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open} position="absolute" sx={{ backgroundColor: '#161e2f', boxShadow: 'none' }} >
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                color: '#fff',
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin Dashboard
            </Typography>
            <AccountMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#161e2f",
            },
            ...open ? styles.drawerStyled : styles.hideDrawer
          }}
        >
          <Toolbar sx={{ backgroundColor: '#161e2f', ...styles.toolBarStyled }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon style={{ color: '#fff' }} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <SideBar />
          </List>
        </Drawer>
        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<AdminHomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/Admin/dashboard" element={<AdminHomePage />} />
            <Route path="/Admin/profile" element={<AdminProfile />} />
            <Route path="/Admin/chat" element={<AdminChat />} />
            <Route path="/Admin/investing_requests" element={<InvestmentRequests />} />


            {/* Subject */}
            <Route path="/Admin/subjects" element={<ShowSubjects />} />
            <Route
              path="/Admin/subjects/chooseclass"
              element={<ChooseClass situation="Subject" />}
            />

            {/* Class */}
            <Route path="/Admin/addclass" element={<AddClass />} />
            <Route path="/Admin/classes" element={<ShowClasses />} />
            <Route path="/Admin/courses" element={<TeacherClassDetails />} />
            <Route path="/Admin/logo-update" element={<LogoUpload />} />
            <Route path="/Teacher/edit-course/:courseId" element={<EditCourseForm/>} />
            <Route path="/Teacher/course" element={<TeacherClassDetails />} />

            {/* Student */}
            {/* <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} /> */}

            {/* Teacher */}
            {/* <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} /> */}

            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box >
    </>
  );
};

export default AdminDashboard;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },
  drawerStyled: {
    display: "flex",
  },
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
