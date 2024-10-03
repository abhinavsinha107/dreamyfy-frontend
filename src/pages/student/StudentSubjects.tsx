import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { useGetAllCoursesQuery } from "../../services/api";
import CourseCard from "../../components/CourseCard";

const StudentSubjects = () => {
  const [selectedSection, setSelectedSection] = useState("All Courses");

  const handleSectionChange = (event, newSection: string) => {
    setSelectedSection(newSection);
  };

  const { data: courses } = useGetAllCoursesQuery();

  const renderTableSection = () => {
    return (
      <>
        <Typography variant="h4" align="center" gutterBottom mt={2}>
          All Courses
        </Typography>
        <Grid container spacing={2} paddingX={2} marginBottom={10}>
          {courses?.data?.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CourseCard {...course} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  const renderClassDetailsSection = () => {
    return (
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Class Details
        </Typography>
        <Typography variant="h5" gutterBottom>
          You are currently in Class
        </Typography>
        <Typography variant="h6" gutterBottom>
          And these are the subjects:
        </Typography>
        {/* {subjectsList &&
          subjectsList.map((subject, index) => (
            <div key={index}>
              <Typography variant="subtitle1">
                {subject.subName} ({subject.subCode})
              </Typography>
            </div>
          ))} */}
      </Container>
    );
  };

  return (
    <>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={selectedSection}
          onChange={handleSectionChange}
          showLabels
        >
          <BottomNavigationAction
            label="All Courses"
            value="All Courses"
            icon={
              selectedSection === "All Courses" ? (
                <TableChartIcon />
              ) : (
                <TableChartOutlinedIcon />
              )
            }
          />
          <BottomNavigationAction
            label="My Courses"
            value="My Courses"
            icon={
              selectedSection === "My Courses" ? (
                <InsertChartIcon />
              ) : (
                <InsertChartOutlinedIcon />
              )
            }
          />
        </BottomNavigation>
      </Paper>
      {selectedSection === "All Courses" && renderTableSection()}
      {selectedSection === "My Courses" && renderClassDetailsSection()}
    </>
  );
};

export default StudentSubjects;
