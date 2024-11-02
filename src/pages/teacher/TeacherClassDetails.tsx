import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Box,
  Container,
} from "@mui/material";
import { BlackButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useGetClassDetailsQuery } from "../../services/api";

const TeacherClassDetails = () => {
  const location = useLocation();
  const { data: classes, refetch } = useGetClassDetailsQuery();
  const navigate = useNavigate();
  const classColumn = [
    { id: "courseName", label: "Course Name", minWidth: 170 },
    { id: "name", label: "Class Name", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "classLink", label: "Class Link", minWidth: 100 },
    { id: "startTime", label: "Start Time", minWidth: 100 },
    { id: "endTime", label: "End Time", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 100 },

  ];

  function convertToUserTimeZone(utcDate) {
    const date = new Date(utcDate);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat(undefined, options).format(date);
  }

  // Button component that accepts a classId prop for actions
  const StudentsButtonHaver = ({ classId }) => {
    const options = ["Edit", "Delete"];
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex] = React.useState(0);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleMenuItemClick = (event, index, classId) => {
      if (index === 0) {
        navigate(`/Teacher/edit-class/${classId}`);
      } else if (index === 1) {
        console.log("Delete class with ID:", classId);
      }
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    return (
      <>
        <BlackButton
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="menu"
          onClick={handleToggle}
          ref={anchorRef}
          sx={{ minWidth: "30px" }}
        >
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </BlackButton>
        <Popper
          sx={{ zIndex: 1 }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) =>
                          handleMenuItemClick(event, index, classId)
                        }
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };

  // Map class data to rows and attach the StudentsButtonHaver with the respective classId
  const classRows =
    classes?.data &&
    classes?.data.length > 0 &&
    classes?.data.map((classItem) => ({
      courseName: classItem.course.name,
      name: classItem.name,
      description: classItem.description,
      startTime: convertToUserTimeZone(classItem.startTime),
      endTime: convertToUserTimeZone(classItem.endTime),
      id: classItem._id,
      classLink: classItem.classLink,
      // Render the action buttons in a new column
      actions: <StudentsButtonHaver classId={classItem._id} />,
    }));

  React.useEffect(() => {
    refetch();
    console.log(classes)

  }, [location, refetch]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", paddingY: 2, }}>
            <Typography variant="h5" gutterBottom mt={1}>
              Your Classes
            </Typography>
          </Box>
          {classes?.data && classes?.data.length > 0 && (
            <TableTemplate
              buttonHaver={(row) => row.actions}
              columns={classColumn}
              rows={classRows}
            />
          )}
        </Container>
      </Paper>
    </>
  );
};

export default TeacherClassDetails;
