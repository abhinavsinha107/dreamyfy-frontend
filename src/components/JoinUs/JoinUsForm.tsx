import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useCreateInvesterMutation } from "../../services/api.ts";
import { notifyError, notifySuccess } from "../../toast.ts";

interface InvesterFormdata {
  name: string;
  email: string;
  phoneNumber: string;
  note: string; // New field for note
}

const JoinUsForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvesterFormdata>();

  const [createInvester, { isLoading, error }] = useCreateInvesterMutation();

  const onSubmit = async (data: InvesterFormdata) => {
    try {
      const res = await createInvester(data).unwrap();
      console.log("Success:", res);
      notifySuccess("Investment request sent successfully!");
       reset();
    } catch (err) {
      console.error("Error:", err);
      notifyError("Failed to send investment request.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Join Us Today
      </Typography>

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
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email is not valid",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        {/* Phone Number */}
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              fullWidth
              margin="normal"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          )}
        />

        {/* Note */}
        <Controller
          name="note"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Note"
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
          )}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Container>
  );
};

export default JoinUsForm;