import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { BlueButton } from "../../components/buttonStyles";
import Classroom from "../../assets/classroom.png";
import styled from "styled-components";
import { createClassSchema } from "../../yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../toast";
import { useCreateClassMutation } from "../../services/api";

interface IClassInput {
  name?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
}

const TeacherAddClass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = location.state || {};

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IClassInput>({
    resolver: yupResolver(createClassSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  const [createClass, { isLoading }] = useCreateClassMutation();

  const onSubmit: SubmitHandler<IClassInput> = async (data: IClassInput) => {
    try {
      const classData = {
        name: data.name,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        course: courseId,
      };

      const res = await createClass(classData).unwrap();
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
                    label="Enter class name"
                    error={!!errors.name}
                    helperText={errors.name ? errors.name.message : ""}
                  />
                )}
              />
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
                    label="Enter class description"
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    focused
                    type="datetime-local"
                    label="Start Time"
                    {...field}
                    error={!!errors.startTime}
                    helperText={
                      errors.startTime ? errors.startTime.message : ""
                    }
                  />
                )}
              />
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <TextField
                    focused
                    type="datetime-local"
                    label="End Time"
                    {...field}
                    error={!!errors.endTime}
                    helperText={errors.endTime ? errors.endTime.message : ""}
                  />
                )}
              />

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Controller
                      name="startTime"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TimePicker
                          label="Start Time"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors?.startTime && (
                      <span className="text-red-500 text-xs ml-4 mt-2">
                        {errors?.startTime?.message}
                      </span>
                    )}
                  </Box>
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Controller
                      name="endTime"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TimePicker
                          label="End Time"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    {errors?.endTime && (
                      <span className="text-red-500 text-xs ml-4 mt-2">
                        {errors?.endTime?.message}
                      </span>
                    )}
                  </Box>
                </DemoContainer>
              </LocalizationProvider> */}

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

export default TeacherAddClass;

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
