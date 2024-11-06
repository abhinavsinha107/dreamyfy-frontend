import { Container, Grid, Paper } from "@mui/material";
import CountUp from "react-countup";
import styled from "styled-components";
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { useGetTeacherStatsQuery } from "../../services/api";

const TeacherHomePage = () => {
  const numberOfStudents = 10;
  const numberOfSessions = 3;
  const{data: teacherStats} = useGetTeacherStatsQuery()

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper sx={{
              boxShadow: 'none',
              borderRadius: 2,
              justifyContent: 'center',
              gap: 2
            }}>
              <img src={Students} alt="Students" />
              <Title>Total Students</Title>
              <Data start={0} end={teacherStats?.data?.totalStudents} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper sx={{
              boxShadow: 'none',
              borderRadius: 2,
              justifyContent: 'center',
              gap: 2
            }}>
              <img src={Lessons} alt="Lessons" />
              <Title>Total Courses</Title>
              <Data start={0} end={teacherStats?.data?.totalCourses} duration={5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper sx={{
              boxShadow: 'none',
              borderRadius: 2,
              justifyContent: 'center',
              gap: 2
            }}>
              <img src={Tests} alt="Tests" />
              <Title>Total Classes Taken</Title>
              <Data start={0} end={teacherStats?.data?.totalClasses} duration={4} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper sx={{
              boxShadow: 'none',
              borderRadius: 2,
              justifyContent: 'center',
              gap: 2
            }}>
              <img src={Time} alt="Time" />
              <Title>Total Hours</Title>
              <Data start={0} end={teacherStats?.data?.totalHours} duration={4} suffix="hrs" />{" "}
            </StyledPaper>
          </Grid>
          {/* <Grid item xs={12}>
            <Paper sx={{
              p: 2, display: "flex", flexDirection: "column", boxShadow: 'none',
              borderRadius: 2,
            }}>
              <SeeNotice />
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default TeacherHomePage;
