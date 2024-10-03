import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "../../../components/buttonStyles";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";
import { createSubjectSchema } from "../../../yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../../toast";
import { useCreateSubjectMutation } from "../../../services/api";

interface ISubjectInput {
  name?: string;
  description?: string;
}

const AddClass = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ISubjectInput>({
    resolver: yupResolver(createSubjectSchema),
  });

  const [createSubject, { isLoading }] = useCreateSubjectMutation();

  const onSubmit: SubmitHandler<ISubjectInput> = async (
    data: ISubjectInput
  ) => {
    try {
      const res = await createSubject(data).unwrap();
      notifySuccess(res?.message);
      reset();
      navigate("/Admin/classes");
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
                    id="name"
                    label="Enter subject name"
                    autoComplete="email"
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
                    multiline
                    minRows={3}
                    maxRows={5}
                    fullWidth
                    id="description"
                    label="Enter description"
                    autoComplete="description"
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : ""
                    }
                  />
                )}
              />
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

export default AddClass;

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
