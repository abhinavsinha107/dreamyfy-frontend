import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "../../components/buttonStyles";
import Classroom from "../../assets/classroom.png";
import styled from "styled-components";
import { createCourseSchema } from "../../yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../toast";
import {
  useGetAllSubjectsQuery,
  useCreateCourseMutation,
} from "../../services/api";

interface ICourseInput {
  name?: string;
  description?: string;
  price?: number;
  startDate?: Date;
  endDate?: Date;
  subject?: string;
}

const TeacherAddCourse = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ICourseInput>({
    resolver: yupResolver(createCourseSchema),
  });
  const { data: subjects } = useGetAllSubjectsQuery();

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const onSubmit: SubmitHandler<ICourseInput> = async (data: ICourseInput) => {
    try {
      const res = await createCourse(data).unwrap();
      notifySuccess(res?.message);
      reset();
      navigate("/Teacher/class");
    } catch (err) {
      const error = err as ErrorResponse;
      const message =
        error?.message === "Validation error!"
          ? error.data?.errors[0].msg ?? "Something went wrong"
          : error?.message ?? "Something went wrong";
      notifyError(message);
    }
  };

  return (
    <>
      <StyledContainer>
        <StyledBox>
          <Stack
            sx={{
              alignItems: "center",
              mb: 3,
            }}
          >
            <img src={Classroom} alt="classroom" style={{ width: "80%" }} />
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* Course Name */}
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    size="small"
                    id="name"
                    label="Enter course name"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                )}
              />

              {/* Course Description */}
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    variant="outlined"
                    size="small"
                    multiline
                    minRows={3}
                    maxRows={5}
                    fullWidth
                    id="description"
                    label="Enter course description"
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                  />
                )}
              />

              {/* Course Price */}
              <Controller
                name="price"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="price"
                    label="Enter course price"
                    type="number"
                    error={!!errors.price}
                    helperText={errors.price ? errors.price.message : ""}
                  />
                )}
              />

              {/* Start Date */}
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="startDate"
                    label="Start Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.startDate}
                    helperText={
                      errors.startDate ? errors.startDate.message : ""
                    }
                  />
                )}
              />

              {/* End Date */}
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="normal"
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="endDate"
                    label="End Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.endDate}
                    helperText={errors.endDate ? errors.endDate.message : ""}
                  />
                )}
              />

              {/* Subject Dropdown */}
              <Controller
                name="subject"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    margin="normal"
                    variant="outlined"
                    size="small"
                    fullWidth
                    id="subject"
                    label="Select Subject"
                    error={!!errors.subject}
                    helperText={errors.subject ? errors.subject.message : ""}
                  >
                    {subjects?.data?.map((subject) => (
                      <MenuItem key={subject._id} value={subject._id}>
                        {subject.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              {/* Submit Button */}
              <BlueButton
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Create"
                )}
              </BlueButton>

              {/* Go Back Button */}
              <Button variant="outlined" onClick={() => navigate(-1)}>
                Go Back
              </Button>
            </Stack>
          </form>
        </StyledBox>
      </StyledContainer>
    </>
  );
};

export default TeacherAddCourse;

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;
