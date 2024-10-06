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
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon
              color={
                location.pathname === "/" ||
                location.pathname === "/Student/dashboard"
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Student/subjects">
          <ListItemIcon>
            <AssignmentIcon
              color={
                location.pathname.startsWith("/Student/subjects")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Student/chat">
          <ListItemIcon>
            <AssignmentIcon
              color={
                location.pathname.startsWith("/Student/chat")
                  ? "primary"
                  : "inherit"
              }
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
        <ListSubheader component="div" inset>
          User
        </ListSubheader>
        <ListItemButton component={Link} to="/Student/profile">
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              color={
                location.pathname.startsWith("/Student/profile")
                  ? "primary"
                  : "inherit"
              }
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
        >
          <ListItemIcon>
            <ExitToAppIcon
              color={
                location.pathname.startsWith("/logout") ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default StudentSideBar;
