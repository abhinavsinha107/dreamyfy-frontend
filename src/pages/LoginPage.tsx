import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "../assets/designlogin.jpg";
import { LightPurpleButton } from "../components/buttonStyles";
import styled from "styled-components";
import { useLoginMutation } from "../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../toast";
import { loginSchema } from "../yup";
import { useAppDispatch } from "../redux/store";
import { setToken } from "../redux/reducer/authReducer";
import { setUser } from "../redux/reducer/userReducer";

const defaultTheme = createTheme();

interface IFormInput {
  email?: string;
  password?: string;
}

const LoginPage = () => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const [loginUser, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      const res = await loginUser(data).unwrap();
      notifySuccess(res?.message);
      dispatch(setToken({ token: res?.data?.accessToken }));
      dispatch(setUser({ user: res?.data?.user }));
      reset();
      const role = res?.data?.user?.role;
      if (role === "ADMIN") {
        navigate("/Admin/dashboard");
      } else if (role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (role === "TEACHER") {
        navigate("/teacher/dashboard");
      }
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
              Login
            </Typography>
            <Typography variant="h6">
              Welcome back! Please enter your details
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 2 }}
            >
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
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                {/* <StyledLink href="#">Forgot password?</StyledLink> */}
              </Grid>
              <LightPurpleButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </LightPurpleButton>
              <Grid container>
                <Grid>Don't have an account?</Grid>
                <Grid item sx={{ ml: 2 }}>
                  <StyledLink to="/register">Sign up</StyledLink>
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="primary" />
        Please Wait
      </Backdrop>
    </ThemeProvider>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
