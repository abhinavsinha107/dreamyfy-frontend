import { useState } from "react";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCardIcon from "@mui/icons-material/AddCard";
import styled from "styled-components";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import { RootState, useAppSelector } from "../../../redux/store";
import { useDeleteSubjectMutation, useGetAllSubjectsQuery } from "../../../services/api";

const ShowClasses = () => {
  const navigate = useNavigate();
  const [deleteSubject] = useDeleteSubjectMutation()
  
  const currentUser = useAppSelector((state: RootState) => state.user.user);

  const adminID = currentUser?._id;

  const { data: subjects, isLoading } = useGetAllSubjectsQuery();

  const deleteHandler =async (deleteID: string) => {
    await deleteSubject(deleteID)
  };

  const sclassColumns = [
    { id: "name", label: "Subject Name", minWidth: 170 },
    { id: "description", label: "Subject Description", minWidth: 170 },
  ];

  const sclassRows =
    subjects?.data &&
    subjects.data?.length > 0 &&
    subjects.data.map((subject) => {
      return {
        id: subject._id,
        name: subject.name,
        description: subject.description,
      };
    });

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      {
        icon: <PostAddIcon />,
        name: "Add Subjects",
        action: () => navigate("/Admin/addsubject/" + row._id),
      },
      {
        icon: <PersonAddAlt1Icon />,
        name: "Add Student",
        action: () => navigate("/Admin/class/addstudents/" + row.id),
      },
    ];
    return (
      <ButtonContainer>
        <IconButton onClick={() => deleteHandler(row.id)} color="secondary">
          <DeleteIcon color="error" />
        </IconButton>
        {/* <BlueButton
          variant="contained"
          sx={{ borderRadius: 20 }}
          onClick={() => navigate("/Admin/classes/class/" + row.id)}
        >
          View
        </BlueButton> */}
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {actions.map((action) => (
            <MenuItem onClick={action.action}>
              <ListItemIcon>{action.icon}</ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: "Add New Class",
      action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Classes",
      action: () => deleteHandler(adminID),
    },
  ];

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!subjects?.data ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <GreenButton
                variant="contained"
                onClick={() => navigate("/Admin/addclass")}
              >
                Add Class
              </GreenButton>
            </Box>
          ) : (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {subjects?.data && subjects?.data?.length > 0 && (
                <TableTemplate
                  buttonHaver={SclassButtonHaver}
                  columns={sclassColumns}
                  rows={sclassRows}
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
