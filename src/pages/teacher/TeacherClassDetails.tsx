import * as React from "react";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Box,
} from "@mui/material";
import { BlackButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useGetClassDetailsQuery } from "../../services/api";
// import { useAppSelector, RootState } from "../../redux/store";

const TeacherClassDetails = () => {
  const location = useLocation();
  // const currentUser = useAppSelector((state: RootState) => state.user.user);

  const { data: classes, refetch } = useGetClassDetailsQuery();

  const classColumn = [
    { id: "courseName", label: "Course Name", minWidth: 170 },
    { id: "name", label: "Class Name", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "startTime", label: "Start Time", minWidth: 100 },
    { id: "endTime", label: "End Time", minWidth: 100 },
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

  const classRows =
    classes?.data &&
    classes?.data?.length > 0 &&
    classes?.data?.map((classes) => {
      return {
        courseName: classes.course.name,
        name: classes.name,
        description: classes.description,
        startTime: convertToUserTimeZone(classes.startTime),
        endTime: convertToUserTimeZone(classes.endTime),
        id: classes._id,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem",
        }}
      >
        <Typography variant="h5" gutterBottom mt={1}>
          Your Classes:
        </Typography>
      </Box>
      {classes?.data && classes?.data?.length > 0 && (
        <TableTemplate
          buttonHaver={StudentsButtonHaver}
          columns={classColumn}
          rows={classRows}
        />
      )}
    </Paper>
  );
};

export default TeacherClassDetails;
