import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReportIcon from "@mui/icons-material/Report";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useAppDispatch } from "../../redux/store";
import { resetToken } from "../../redux/reducer/authReducer";
import { resetUser } from "../../redux/reducer/userReducer";
import { notifySuccess } from "../../toast";
import UploadIcon from '@mui/icons-material/Upload';
import ChatIcon from '@mui/icons-material/Chat';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <React.Fragment>
        <ListItemButton
          component={Link}
          to="/"
          sx={{
            backgroundColor: location.pathname === "/" ? "#D8B74E" : "transparent",
            color: 'white',
            '&:hover': {
              backgroundColor: '#D8B74E',
            },
            '&:focus': {
              backgroundColor: '#D8B74E',
            },
            '&.Mui-selected': {
              backgroundColor: '#D8B74E',
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon
              sx={{
                backgroundColor: location.pathname === "/" || location.pathname === "/Admin/dashboard" ? "transparent" : "transparent",
                color: 'white',
                '&:hover': {
                  color: 'white',
                },
                '&:focus': {
                  color: 'white',
                },
                '&.Mui-selected': {
                  color: 'white',
                },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton component={Link} to="/Admin/classes"
          sx={{
            backgroundColor: location.pathname === "/Admin/classes" ? "#D8B74E" : "transparent",
            color: 'white',
            '&:hover': {
              backgroundColor: '#D8B74E',
            },
            '&:focus': {
              backgroundColor: '#D8B74E',
            },
            '&.Mui-selected': {
              backgroundColor: '#D8B74E',
            },
          }}
        >
          <ListItemIcon>
            <ClassOutlinedIcon
              sx={{
                backgroundColor: location.pathname.startsWith("/Admin/classes") ? "transparent" : "transparent",
                color: 'white',
                '&:hover': {
                  color: 'white',
                },
                '&:focus': {
                  color: 'white',
                },
                '&.Mui-selected': {
                  color: 'white',
                },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Subjects" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/courses"
          sx={{
            backgroundColor: location.pathname === "/Admin/courses" ? "#D8B74E" : "transparent",
            color: 'white',
            '&:hover': {
              backgroundColor: '#D8B74E',
            },
            '&:focus': {
              backgroundColor: '#D8B74E',
            },
            '&.Mui-selected': {
              backgroundColor: '#D8B74E',
            },
          }}
        >
          <ListItemIcon>
            <AssignmentIcon
              sx={{
                backgroundColor: location.pathname.startsWith("/Admin/courses") ? "transparent" : "transparent",
                color: 'white',
                '&:hover': {
                  color: 'white',
                },
                '&:focus': {
                  color: 'white',
                },
                '&.Mui-selected': {
                  color: 'white',
                },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/logo-update"
          sx={{
            backgroundColor: location.pathname === "/Admin/logo-update" ? "#D8B74E" : "transparent",
            color: 'white',
            '&:hover': {
              backgroundColor: '#D8B74E',
            },
            '&:focus': {
              backgroundColor: '#D8B74E',
            },
            '&.Mui-selected': {
              backgroundColor: '#D8B74E',
            },
          }}
        >
          <ListItemIcon>
            <UploadIcon
              sx={{
                backgroundColor: location.pathname.startsWith("/Admin/logo-update") ? "transparent" : "transparent",
                color: 'white',
                '&:hover': {
                  color: 'white',
                },
                '&:focus': {
                  color: 'white',
                },
                '&.Mui-selected': {
                  color: 'white',
                },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Upload Logo" />
        </ListItemButton>
        {/* <ListItemButton component={Link} to="/Admin/teachers">
          <ListItemIcon>
            <SupervisorAccountOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/teachers")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/students">
          <ListItemIcon>
            <PersonOutlineIcon
              color={
                location.pathname.startsWith("/Admin/students")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton> 
        <ListItemButton component={Link} to="/Admin/notices">
          <ListItemIcon>
            <AnnouncementOutlinedIcon
              color={
                location.pathname.startsWith("/Admin/notices")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Notices" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/complains">
          <ListItemIcon>
            <ReportIcon
              color={
                location.pathname.startsWith("/Admin/complains")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Complains" />
        </ListItemButton>*/}
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component="div" inset sx={{
          backgroundColor: '#1c263b',
          color: 'white',
        }}>
          User
        </ListSubheader>
        <ListItemButton component={Link} to="/Admin/profile"
          sx={{
            backgroundColor: location.pathname === "/Admin/profile" ? "#D8B74E" : "transparent",
            color: 'white',
            '&:hover': {
              backgroundColor: '#D8B74E',
            },
            '&:focus': {
              backgroundColor: '#D8B74E',
            },
            '&.Mui-selected': {
              backgroundColor: '#D8B74E',
            },
          }}
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              sx={{
                backgroundColor: location.pathname.startsWith("/Admin/profile") ? "transparent" : "transparent",
                color: 'white',
                '&:hover': {
                  color: 'white',
                },
                '&:focus': {
                  color: 'white',
                },
                '&.Mui-selected': {
                  color: 'white',
                },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/chat"
          sx={{
            backgroundColor: location.pathname === "/Admin/chat" ? "#D8B74E" : "transparent",
            color: 'white',
            '&:hover': {
              backgroundColor: '#D8B74E',
            },
            '&:focus': {
              backgroundColor: '#D8B74E',
            },
            '&.Mui-selected': {
              backgroundColor: '#D8B74E',
            },
          }}
        >
          <ListItemIcon>
            <ChatIcon
              sx={{
                backgroundColor: location.pathname.startsWith("/Admin/chat") ? "transparent" : "transparent",
                color: 'white',
                '&:hover': {
                  color: 'white',
                },
                '&:focus': {
                  color: 'white',
                },
                '&.Mui-selected': {
                  color: 'white',
                },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Admin/investing_requests"
          sx={{
            backgroundColor: location.pathname === "/Admin/investing_requests" ? "#D8B74E" : "transparent",
            color: 'white',
            '&:hover': {
              backgroundColor: '#D8B74E',
            },
            '&:focus': {
              backgroundColor: '#D8B74E',
            },
            '&.Mui-selected': {
              backgroundColor: '#D8B74E',
            },
          }}
        >
          <ListItemIcon>
            <AttachMoneyIcon
              sx={{
                backgroundColor: location.pathname.startsWith("/Admin/investing_requests") ? "transparent" : "transparent",
                color: 'white',
                '&:hover': {
                  color: 'white',
                },
                '&:focus': {
                  color: 'white',
                },
                '&.Mui-selected': {
                  color: 'white',
                },
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Investing Requests" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            notifySuccess("Logged out successfully");
            dispatch(resetToken());
            dispatch(resetUser());
            navigate("/");
          }}
          sx={{
            backgroundColor: location.pathname === "/logout" ? "#D8B74E" : "transparent",
            color: 'white',
            '&:hover': {
              backgroundColor: '#D8B74E',
            },
            '&:focus': {
              backgroundColor: '#D8B74E',
            },
            '&.Mui-selected': {
              backgroundColor: '#D8B74E',
            },
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon
              sx={{
                backgroundColor: location.pathname.startsWith("/logout") ? "transparent" : "transparent",
                color: 'white',
                '&:hover': {
                  color: 'white',
                },
                '&:focus': {
                  color: 'white',
                },
                '&.Mui-selected': {
                  color: 'white',
                },
              }}

            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;
