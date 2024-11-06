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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { notifySuccess } from "../../toast";
import { resetToken } from "../../redux/reducer/authReducer";
import { resetUser } from "../../redux/reducer/userReducer";
import { useAppDispatch } from "../../redux/store";

const StudentSideBar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/"
          sx={{
            backgroundColor: location.pathname === "/" ||
              location.pathname === "/Student/dashboard" ? "#D8B74E" : "transparent",
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
                backgroundColor: location.pathname === "/" ||
                  location.pathname === "/Student/dashboard" ? "transparent" : "transparent",
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
        <ListItemButton component={Link} to="/Student/subjects"
          sx={{
            backgroundColor: location.pathname === "/Student/subjects" ? "#D8B74E" : "transparent",
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
                backgroundColor: location.pathname.startsWith("/Student/subjects") ? "transparent" : "transparent",
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
        <ListItemButton component={Link} to="/Student/chat"
          sx={{
            backgroundColor: location.pathname === "/Student/chat" ? "#D8B74E" : "transparent",
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
                backgroundColor: location.pathname.startsWith("/Student/chat") ? "transparent" : "transparent",
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
        {/* <ListItemButton component={Link} to="/Student/attendance">
          <ListItemIcon>
            <ClassOutlinedIcon
              color={
                location.pathname.startsWith("/Student/attendance")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Student/complain">
          <ListItemIcon>
            <AnnouncementOutlinedIcon
              color={
                location.pathname.startsWith("/Student/complain")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Complain" />
        </ListItemButton> */}
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component="div" inset sx={{
          backgroundColor: '#1c263b',
          color: 'white',
        }}>
          User
        </ListSubheader>
        <ListItemButton component={Link} to="/Student/profile"
          sx={{
            backgroundColor: location.pathname === "/Student/profile" ? "#D8B74E" : "transparent",
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
                backgroundColor: location.pathname.startsWith("/Student/profile") ? "transparent" : "transparent",
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

export default StudentSideBar;
