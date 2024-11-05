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
  Button,
} from "@mui/material";
import { BlackButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useGetAllCoursesQuery } from "../../services/api";

// Move StudentsButtonHaver here
const StudentsButtonHaver = ({ courseId }) => {
  const options = ["Edit"];
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex] = React.useState(0);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenuItemClick = (event, index) => {
    setOpen(false);
    if (index === 0) {
      navigate(`/Teacher/edit-course/${courseId}`);
    } else if (index === 1) {
      console.log("Delete course with ID:", courseId);
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
                      onClick={(event) => handleMenuItemClick(event, index)}
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

const TeacherCourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: courses, refetch } = useGetAllCoursesQuery();

  const courseColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "isApproved", label: "Approved", minWidth: 100 },
    { id: "addClass", label: "Add Class", minWidth: 100 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  const courseRows =
    courses?.data &&
    courses?.data?.length > 0 &&
    courses?.data?.map((course) => ({
      name: course.name,
      description: course.description,
      isApproved: course.isApproved,
      addClass: "Add Class",
      id: course._id,
      actions: <StudentsButtonHaver courseId={course._id} />, // Reference StudentsButtonHaver here
    }));

  React.useEffect(() => {
    refetch();
  }, [location, refetch]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem",
        }}
      >
        <Typography variant="h5" gutterBottom mt={1}>
          Your Courses:
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/Teacher/add-course")}
          sx={{ margin: "2px 3px 1px" }}
        >
          Add Course
        </Button>
      </Box>
      {courses?.data && courses?.data?.length > 0 && (
        <TableTemplate
          buttonHaver={(row) => row.actions}
          columns={courseColumns}
          rows={courseRows}
        />
      )}
    </Paper>
  );
};

export default TeacherCourseDetails;
