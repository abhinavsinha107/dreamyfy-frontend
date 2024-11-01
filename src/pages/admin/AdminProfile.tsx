import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { RootState, useAppSelector } from "../../redux/store";
import styled from "styled-components";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useUploadFileMutation,
} from "../../services/api";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userUpdateSchema } from "../../yup";
import { notifyError, notifySuccess } from "../../toast";
import EditIcon from "@mui/icons-material/Edit";

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;

const AdminProfile = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.user);
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
  });
  const { data: adminData } = useGetUserDetailsQuery(currentUser?._id);
  const [updateDetails] = useUpdateUserDetailsMutation();
  const [uploadFile, { isSuccess }] = useUploadFileMutation();

  const [isDisable, setIsDisable] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState(null);

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        await uploadFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarSrc(reader.result);
        };
        reader.readAsDataURL(file);
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

  const onSubmit = async (values) => {
    try {
      const dataToUpdate = {
        name: values.name,
        email: values.email,
        bio: values.bio,
        phoneNumber: values.phoneNumber,
      };
      const response = await updateDetails({
        data: dataToUpdate,
        id: currentUser._id,
      }).unwrap();

      notifySuccess(response.message);
    } catch (err) {
      const error = err as ErrorResponse;
      const message =
        error?.message === "Validation error!"
          ? error.data?.errors[0].msg ?? "Something went wrong"
          : error?.message ?? "Something went wrong";
      notifyError(message);
    }
  };

  useEffect(() => {
    if (adminData?.data && Object.keys(adminData.data).length > 0) {
      reset({
        email: adminData?.data?.user.email ?? "",
        name: adminData?.data?.user.name ?? "",
        bio: adminData?.data?.user.bio ?? "",
        phoneNumber: adminData?.data?.user.phoneNumber ?? "",
        dateOfBirth: adminData?.data?.user.dateOfBirth,
      });
      setAvatarSrc(adminData?.data?.user.profilePicture)
    }
  }, [adminData?.data]);

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Profile pic uploaded successfully");
    }
  }, [isSuccess]);

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
        <StyledPaper elevation={0}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" position="relative">
                <input
                  type="file"
                  accept="image/*"
                  id="profilePic"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Avatar
                  alt="Student Avatar"
                  sx={{
                    width: 150,
                    height: 150,
                    border: '1px solid #ccc'
                  }}
                  src={avatarSrc || undefined}
                >
                  <>{!avatarSrc && String(getValues("name")).charAt(0)} </>
                </Avatar>
                <label
                  style={{
                    backgroundColor: "#1976D2",
                    borderRadius: "50%",
                    width: "2.5rem",
                    height: "2.5rem",
                    position: "absolute",
                    bottom: "5px",
                    left: "53%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  htmlFor="profilePic"
                >
                  <EditIcon
                    sx={{
                      fontSize: "1.5rem",
                      color: "white",
                    }}
                  />
                </label>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center" sx={{
                  marginTop: 2,
                }}>
                  {getValues("name")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
        <Card elevation={0}>
          <CardContent>
            <Grid
              container
              spacing={0}
              justifyContent="space-between"
              paddingY="2rem"
            >
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Button
                onClick={() => setIsDisable(false)}
                variant="contained"
                endIcon={<AddIcon />}
              >
                Edit
              </Button>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Name"
                          sx={isDisable && { pointerEvents: "none" }}
                          variant="outlined"
                          placeholder="Enter Ypur Name"
                          fullWidth
                        />
                      )}
                    />
                    {errors?.name && (
                      <Typography
                        sx={{
                          color: "red",
                          fontSize: "12px",
                          marginLeft: "10px",
                        }}
                      >
                        {errors?.name?.message}
                      </Typography>
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" component="p">
                    <Controller
                      name="phoneNumber"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Phone Number"
                          variant="outlined"
                          sx={isDisable && { pointerEvents: "none" }}
                          placeholder="Enter Phone Number"
                          fullWidth
                        />
                      )}
                    />
                  </Typography>
                  {errors?.phoneNumber && (
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {errors?.phoneNumber?.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="subtitle1" component="p">
                    <Controller
                      name="email"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Email"
                          variant="outlined"
                          sx={isDisable && { pointerEvents: "none" }}
                          placeholder="Enter Your Email"
                          fullWidth
                        />
                      )}
                    />
                  </Typography>
                  {errors?.email && (
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {errors?.email?.message}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Typography variant="subtitle1" component="p">
                    <Controller
                      name="bio"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Bio"
                          variant="outlined"
                          sx={isDisable && { pointerEvents: "none" }}
                          placeholder="Enter About Yourself"
                          multiline
                          maxRows={4}
                          fullWidth
                        />
                      )}
                    />
                  </Typography>
                  {errors?.bio && (
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {errors?.bio?.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Box sx={{ textAlign: "end", marginTop: "1rem" }}>
                <Button type="submit" variant="contained">
                  SUBMIT
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AdminProfile;
