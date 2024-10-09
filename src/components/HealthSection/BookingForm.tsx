import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useBookSessionMutation } from '../../services/api';
import { notifyError, notifySuccess } from '../../toast';

interface FormValues {
    name: string;
    email: string;
    date: string;
    time: string;
    comments: string;
}

const BookingForm: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const [bookSession, {data}] = useBookSessionMutation();

    const onSubmit = async (data: FormValues) => {
        // Handle form submission logic here
        try {
            const res = await bookSession(data).unwrap();
            notifySuccess(res?.message);
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
            {!data && <><Typography variant="h4" gutterBottom>
                Book a Session
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

                {/* Preferred Date */}
                <Controller
                    name="date"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Preferred Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.date}
                            helperText={errors.date?.message}
                        />
                    )}
                />

                {/* Preferred Time */}
                <Controller
                    name="time"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Time is required" }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Preferred Time"
                            type="time"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.time}
                            helperText={errors.time?.message}
                        />
                    )}
                />

                {/* Additional Comments */}
                <Controller
                    name="comments"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Additional Comments"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
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
                    Book Now
                </Button>
            </form>
            </>}
            {data && <Typography>Session booked with session Id: {data?.data?._id}</Typography>}
        </Container>
    );
};

export default BookingForm;
