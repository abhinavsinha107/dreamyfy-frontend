import React from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useRegisterTecherMutation } from "../services/api";
import { notifyError, notifySuccess } from "../toast";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import InnerVideobanner from "../components/VideoBanner/InnerVideobanner";
import Footer from "../components/Footer/Footer";

interface TutorFormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  bio: string;
  role: string;
}

const BecomeATutor: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TutorFormData>();

  const navigate = useNavigate();

  const [registerUser] = useRegisterTecherMutation();

  const onSubmit = async (data: TutorFormData) => {
    data = { ...data, role: "TEACHER" };
    try {
      const res = await registerUser(data).unwrap();
      notifySuccess(res?.message);
      navigate("/login");
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
      <Header />
      <InnerVideobanner bannerTitle="Become a Tutor" />
      <div className='container mx-auto py-14 px-4'>
        <div className='row'>
          <div className='w-full max-w-lg mx-auto'>
            {/* <Typography variant="h4" gutterBottom>
          Become a Tutor
        </Typography> */}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    margin="normal"
                    size="small"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    size="small"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              {/* Phone Number */}
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    margin="normal"
                    size="small"
                  />
                )}
              />

              {/* Date of Birth */}
              <Controller
                name="dateOfBirth"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    margin="normal"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />

              {/* Bio */}
              <Controller
                name="bio"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bio"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    size="small"
                  />
                )}
              />

              {/* Submit Button */}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BecomeATutor;
