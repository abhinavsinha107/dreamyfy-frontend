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
import TeacherSideBar from "./TeacherSideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import AccountMenu from "../../components/AccountMenu";
import { AppBar, Drawer } from "../../components/styles";
// import StudentAttendance from "../admin/studentRelated/StudentAttendance";

// import TeacherComplain from "./TeacherComplain";
import TeacherHomePage from "./TeacherHomePage";
import TeacherProfile from "./TeacherProfile";
import TeacherAddClass from "./TeacherAddClass";
import TeacherAddCourse from "./TeacherAddCourse";
import TeacherCourseDetails from "./TeacherCourseDetails";
import TeacherClassDetails from "./TeacherClassDetails";
import TeacherPaymentsPage from "./TeacherPaymentsPage";
import Chat from "../StudentTeacherChat";
import StudentTeacherChat from "../StudentTeacherChat";
import EditClassForm from "./EditClassForm ";
// import TeacherViewStudent from "./TeacherViewStudent";
// import StudentExamMarks from "../admin/studentRelated/StudentExamMarks";

const TeacherDashboard = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open} position="absolute">
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
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
              Teacher Dashboard
            </Typography>
            <AccountMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={open ? styles.drawerStyled : styles.hideDrawer}
        >
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <TeacherSideBar />
          </List>
        </Drawer>
        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<TeacherHomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
            <Route path="/Teacher/profile" element={<TeacherProfile />} />

            {/* <Route path="/Teacher/complain" element={<TeacherComplain />} /> */}

            <Route path="/Teacher/course" element={<TeacherCourseDetails />} />
            <Route path="/Teacher/add-course" element={<TeacherAddCourse />} /> 
            <Route path="/Teacher/edit-class/:classId" element={<EditClassForm />} />
            <Route path="/Teacher/class" element={<TeacherClassDetails />} />
            <Route path="/Teacher/add-class" element={<TeacherAddClass />} />
            {/* <Route
              path="/Teacher/class/student/:id"
              element={<TeacherViewStudent />}
            />

            <Route
              path="/Teacher/class/student/attendance/:studentID/:subjectID"
              element={<StudentAttendance situation="Subject" />}
            />
            <Route
              path="/Teacher/class/student/marks/:studentID/:subjectID"
              element={<StudentExamMarks situation="Subject" />}
            /> 

            <Route path="/logout" element={<Logout />} /> */}

            <Route path="/Teacher/payments" element={<TeacherPaymentsPage />} />
            <Route path="/Teacher/chat" element={<StudentTeacherChat />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default TeacherDashboard;

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
