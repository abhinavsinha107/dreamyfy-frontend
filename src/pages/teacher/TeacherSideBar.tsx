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
        <ListItemButton component={Link} to="/"
          sx={{
            backgroundColor: location.pathname === "/" ||
              location.pathname === "/Teacher/dashboard" ? "#D8B74E" : "transparent",
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
                  location.pathname === "/Teacher/dashboard" ? "transparent" : "transparent",
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
        <ListItemButton component={Link} to="/Teacher/course"
          sx={{
            backgroundColor: location.pathname === "/Teacher/course" ? "#D8B74E" : "transparent",
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
                backgroundColor: location.pathname.startsWith("/Teacher/course") ? "transparent" : "transparent",
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
          <ListItemText primary={`Courses`} />
        </ListItemButton>
        <ListItemButton component={Link} to="/Teacher/class"
          sx={{
            backgroundColor: location.pathname === "/Teacher/class" ? "#D8B74E" : "transparent",
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
                backgroundColor: location.pathname.startsWith("/Teacher/class") ? "transparent" : "transparent",
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
          <ListItemText primary={`Class`} />
        </ListItemButton>
        <ListItemButton component={Link} to="/Teacher/payments"
          sx={{
            backgroundColor: location.pathname === "/Teacher/payments" ? "#D8B74E" : "transparent",
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
            <PaymentIcon
              sx={{
                backgroundColor: location.pathname.startsWith("/Teacher/payments") ? "transparent" : "transparent",
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
          <ListItemText primary={`Payments`} />
        </ListItemButton>
        <ListItemButton component={Link} to="/Teacher/chat"
          sx={{
            backgroundColor: location.pathname === "/Teacher/chat" ? "#D8B74E" : "transparent",
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
                backgroundColor: location.pathname.startsWith("/Teacher/chat") ? "transparent" : "transparent",
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
        <ListSubheader component="div" inset sx={{
          backgroundColor: '#1c263b',
          color: 'white',
        }}>
          User
        </ListSubheader>
        <ListItemButton component={Link} to="/Teacher/profile"
          sx={{
            backgroundColor: location.pathname === "/Teacher/profile" ? "#D8B74E" : "transparent",
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
                backgroundColor: location.pathname.startsWith("/Teacher/profile") ? "transparent" : "transparent",
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

export default TeacherSideBar;
