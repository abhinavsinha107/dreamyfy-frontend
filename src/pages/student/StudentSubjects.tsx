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
import { useGetAllCoursesQuery, useGetStudentCoursesQuery } from "../../services/api";
import CourseCard from "../../components/CourseCard";

const StudentSubjects = () => {
  const [selectedSection, setSelectedSection] = useState("All Courses");

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  // Fetch all courses
  const { data: allCourses } = useGetAllCoursesQuery();
  // Fetch courses specific to the student
  const { data: myCourses } = useGetStudentCoursesQuery();

  // Function to render courses based on selected section
  const renderCourses = () => {
    const coursesToDisplay = selectedSection === "All Courses" ? allCourses : myCourses;

    return (
      <Grid container spacing={2} paddingX={2} marginBottom={10}>
        {coursesToDisplay?.data?.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CourseCard {...course} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
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
      
      {/* Render courses based on selected section */}
      <Container>
        <Typography variant="h4" align="center" gutterBottom mt={2}>
          {selectedSection === "All Courses" ? "All Courses" : "My Courses"}
        </Typography>
        {renderCourses()}
      </Container>
    </>
  );
};

export default StudentSubjects;
