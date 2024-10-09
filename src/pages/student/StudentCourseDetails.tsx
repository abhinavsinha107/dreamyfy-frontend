import React from "react";
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
  useGetCourseByIdQuery,
  useStripeCheckoutMutation,
} from "../../services/api";
import { useParams } from "react-router-dom";

const StudentCourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading } = useGetCourseByIdQuery(id, { skip: !id });

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
        'courseId':course?.data._id.toString()
      });
      window.location.href = res.data.data.url
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ paddingTop: 5 }}>
        {/* Left Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
              {course?.data?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {course?.data?.description}
            </Typography>

            {/* Ratings */}
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                Timeline:{" "}
                {course?.data?.startDate &&
                  formattedDate(new Date(course?.data?.startDate))}{" "}
                -{" "}
                {course?.data?.endDate &&
                  formattedDate(new Date(course?.data?.endDate))}
              </Typography>
            </Box>

            {/* Instructor and Last Update */}
            <Typography variant="body2" color="textSecondary">
              Created by {course?.data?.teacher.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Last updated{" "}
              {course?.data?.endDate &&
                formattedDate(new Date(course?.data?.updatedAt))}{" "}
              • English
            </Typography>
          </Paper>

          {/* What You'll Learn Section */}
          <Paper elevation={2} sx={{ marginTop: 2, padding: 2 }}>
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
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                ₹{course?.data?.price}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={handleStripePayment}
              >
                Purchase Course
              </Button>
            </Box>
          </Paper>

          {/* More info (optional, can be removed if not needed) */}
          <Paper elevation={2} sx={{ marginTop: 2, padding: 2 }}>
            <Typography variant="body2">
              Subscribe to Dreamify's top courses. Get this course, plus 12,000+
              of our top-rated courses, with Personal Plan. Learn more.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Backdrop sx={{ color: "#fff", zIndex: 999 }} open={isLoading}>
        <CircularProgress color="primary" />
        Please Wait
      </Backdrop>
    </Container>
  );
};

export default StudentCourseDetails;
