import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Paper,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "../assets/designlogin.jpg";
import { LightPurpleButton } from "../components/buttonStyles";
import styled from "styled-components";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../yup";
import { useRegisterMutation } from "../services/api";
import { notifySuccess, notifyError } from "../toast";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

const defaultTheme = createTheme();

interface IFormInput {
  name?: string;
  email?: string;
  password?: string;
}

const RegisterPage = () => {
  const [toggle, setToggle] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const [registerUser, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      const res = await registerUser(data).unwrap();
      notifySuccess(res?.message);
      reset();
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
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                Register
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 2 }}
              >
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Enter your name"
                      autoComplete="name"
                      autoFocus
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Enter your email"
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      type={toggle ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      error={!!errors.password}
                      helperText={errors.password ? errors.password.message : ""}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setToggle(!toggle)}>
                              {toggle ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
                <LightPurpleButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Register"
                  )}
                </LightPurpleButton>
                <Grid container>
                  <Grid>Already have an account?</Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <StyledLink to="/login">Log in</StyledLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${bgpic})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </ThemeProvider>
      <Footer />
    </>

  );
};

export default RegisterPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
