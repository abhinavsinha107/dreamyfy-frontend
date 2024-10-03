import React from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import {useRegisterTecherMutation} from "../../services/api.ts";
import {notifyError, notifySuccess} from "../../toast.ts";

interface InvesterFormdata {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

const JoinUsForm: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<InvesterFormdata>();

    const navigate = useNavigate();

    const [registerUser] = useRegisterTecherMutation();

    const onSubmit = async (data: InvesterFormdata) => {
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
                    rules={{ required: "Email is required" }}
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
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Phone Number"
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
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default JoinUsForm;
