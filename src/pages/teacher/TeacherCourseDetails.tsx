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
  Container,
} from "@mui/material";
import { BlackButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useGetAllCoursesQuery } from "../../services/api";

const TeacherCourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: courses, refetch } = useGetAllCoursesQuery();

  const courseColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "isApproved", label: "Approved", minWidth: 100 },
    { id: "addClass", label: "Add Class", minWidth: 100 },
  ];

  const courseRows =
    courses?.data &&
    courses?.data?.length > 0 &&
    courses?.data?.map((course) => {
      return {
        name: course.name,
        description: course.description,
        isApproved: course.isApproved,
        addClass: "Add Class",
        id: course._id,
      };
    });

  const StudentsButtonHaver = () => {
    const options = ["Edit", "Delete"];

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex] = React.useState(0);

    // const handleClick = () => {
    //   console.info(`You clicked ${options[selectedIndex]}`);
    // };

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
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
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          ref={anchorRef}
          sx={{ minWidth: "30px" }}
        >
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </BlackButton>
        <Popper
          sx={{
            zIndex: 1,
          }}
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
                        disabled={index === 2}
                        selected={index === selectedIndex}
                      // onClick={(event) => {
                      //   handleMenuItemClick(event, index);
                      // }}
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

  React.useEffect(() => {
    refetch();
  }, [location, refetch]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingY: 2,

          }}
        >
          <Typography variant="h5" gutterBottom mt={1}>
            Your Courses
          </Typography>
          <Button
            variant="contained"
            sx={{
              boxShadow: 'none',
              borderRadius: 20,
              backgroundColor: '#d8b74e',
              color: 'white',
              '&:hover': {
                backgroundColor: '#161e2f',
              },
              '&:focus': {
                backgroundColor: '#161e2f',
              },
            }}
            onClick={() => navigate("/Teacher/add-course")}
          >
            Add Course
          </Button>
        </Box>
        {courses?.data && courses?.data?.length > 0 && (
          <TableTemplate
            buttonHaver={StudentsButtonHaver}
            columns={courseColumns}
            rows={courseRows}
          />
        )}
      </Container>
    </Paper>
  );
};

export default TeacherCourseDetails;
