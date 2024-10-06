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
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import { useAppDispatch } from "../../redux/store";
import { notifySuccess } from "../../toast";
import { resetToken } from "../../redux/reducer/authReducer";
import { resetUser } from "../../redux/reducer/userReducer";
import ChatIcon from '@mui/icons-material/Chat';
import PaymentIcon from '@mui/icons-material/Payment';

const TeacherSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon
              color={
                location.pathname === "/" ||
                location.pathname === "/Teacher/dashboard"
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Teacher/course">
          <ListItemIcon>
            <ClassOutlinedIcon
              color={
                location.pathname.startsWith("/Teacher/course")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary={`Courses`} />
        </ListItemButton>
        <ListItemButton component={Link} to="/Teacher/class">
          <ListItemIcon>
            <ClassOutlinedIcon
              color={
                location.pathname.startsWith("/Teacher/class")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary={`Class`} />
        </ListItemButton>
        <ListItemButton component={Link} to="/Teacher/payments">
          <ListItemIcon>
            <PaymentIcon
              color={
                location.pathname.startsWith("/Teacher/payments")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary={`Payments`} />
        </ListItemButton>
        <ListItemButton component={Link} to="/Teacher/chat">
          <ListItemIcon>
            <ChatIcon
              color={
                location.pathname.startsWith("/Teacher/chat")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary={`Chat`} />
        </ListItemButton>
        {/* <ListItemButton component={Link} to="/Teacher/complain">
          <ListItemIcon>
            <AnnouncementOutlinedIcon
              color={
                location.pathname.startsWith("/Teacher/complain")
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
        <ListItemButton component={Link} to="/Teacher/profile">
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              color={
                location.pathname.startsWith("/Teacher/profile")
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

export default TeacherSideBar;
