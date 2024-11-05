import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import {
  useGetClassByCourseQuery,
  useGetCourseByIdQuery, useGetUserDetailsQuery,
  useStripeCheckoutMutation,
} from "../../services/api";
import { useParams } from "react-router-dom";
import { RootState, useAppSelector } from "../../redux/store.ts";

const StudentCourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading } = useGetCourseByIdQuery(id, { skip: !id });
  const currentUser = useAppSelector((state: RootState) => state.user.user);
  const { data: currentUserDetails } = useGetUserDetailsQuery(currentUser._id)
  const { data: courseClasses } = useGetClassByCourseQuery(id)
  const formattedDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
  };
  const [checkout] = useStripeCheckoutMutation();

  const handleStripePayment = async () => {
    try {
      const res = await checkout({
        'courseId': course?.data._id.toString()
      });
      window.location.href = res.data.data.url
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ paddingTop: 4, paddingBottom: 2, }}>
        {/* Left Section */}
        <Grid item xs={12} md={12}>
          <Paper elevation={0} sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
              {course?.data?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {course?.data?.description}
            </Typography>

            {/* Ratings */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body2">
                Timeline:{" "}
                {course?.data?.startDate &&
                  formattedDate(new Date(course?.data?.startDate))}{" "}
                -{" "}
                {course?.data?.endDate &&
                  formattedDate(new Date(course?.data?.endDate))}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {/* Instructor and Last Update */}
                <Typography variant="body2" color="textSecondary">
                  Created by {course?.data?.teacher.name}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" align="right" color="textSecondary">
                  Last updated{" "}
                  {course?.data?.endDate &&
                    formattedDate(new Date(course?.data?.updatedAt))}{" "}
                  • English
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {/* Teacher Details Section */}
              {!currentUserDetails?.data?.user?.courses.includes(course?.data?._id) && (
                <Paper elevation={0} sx={{ marginTop: 2, padding: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Teacher Details
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary={course?.data?.teacher?.name} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={course?.data?.teacher?.phoneNumber} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={course?.data?.teacher?.bio} />
                    </ListItem>
                  </List>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {/* Right Section */}
              {!currentUserDetails?.data?.user?.courses.includes(course?.data?._id) && (
                <Grid item xs={12} md={12}>
                  <Paper elevation={0} sx={{ marginTop: 2, padding: 2 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                      <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                        ₹{course?.data?.price}
                      </Typography>
                      <Button variant="contained" fullWidth onClick={handleStripePayment} sx={{
                        color: 'white',
                        border: 'none',
                        '&:hover': {
                          backgroundColor: '#d8b74e',
                          boxShadow: 'none',
                          border: 'none',
                        },
                        '&:focus': {
                          backgroundColor: '#d8b74e',
                        },
                        boxShadow: 'none', backgroundColor: '#161e2f', borderRadius: 40,
                      }} >
                        Purchase Course
                      </Button>
                    </Box>
                  </Paper>

                  {/* More info */}
                  <Paper elevation={0} sx={{ marginTop: 2, padding: 2 }}>
                    <Typography variant="body2">
                      Subscribe to Dreamify's top courses. Get this course, plus 12,000+
                      of our top-rated courses, with Personal Plan. Learn more.
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>



        {/* Classes Section */}
        {currentUserDetails?.data?.user?.courses.includes(course?.data?._id) &&
          <Grid item xs={12} md={12}>
            {courseClasses?.data && courseClasses.data.length > 0 ? (
              courseClasses.data.map((classItem) => (
                <Paper key={classItem._id} elevation={0} sx={{ padding: 4, marginBottom: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={10}>
                      <Typography variant="h6">{classItem.name}</Typography>
                      <Typography variant="body2">
                        <strong>Description:</strong> {classItem.description || 'N/A'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Start Time:</strong> {new Date(classItem.startTime).toLocaleString()}
                      </Typography>
                      <Typography variant="body2">
                        <strong>End Time:</strong> {new Date(classItem.endTime).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={2} style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <a href={classItem.classLink} target="_blank" rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" sx={{
                          color: 'white',
                          border: 'none',
                          '&:hover': {
                            backgroundColor: '#d8b74e',
                            boxShadow: 'none',
                            border: 'none',
                          },
                          '&:focus': {
                            backgroundColor: '#d8b74e',
                          },
                          boxShadow: 'none', backgroundColor: '#161e2f', borderRadius: 40,
                        }} >
                          Class Link
                        </Button>
                      </a>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            ) : (
              <Paper elevation={1} sx={{ padding: 2, textAlign: 'center', marginTop: 2 }}>
                <Typography variant="body2">No Classes Yet</Typography>
              </Paper>
            )}
          </Grid>}
      </Grid>

      {/* Loading Backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: 999 }} open={isLoading}>
        <CircularProgress color="primary" />
        Please Wait
      </Backdrop>
    </Container>

  );
};
export default StudentCourseDetails;


const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none'
  },
  noClasses: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#555',
  },
};