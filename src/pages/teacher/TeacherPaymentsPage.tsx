import * as React from "react";
import { Paper, Typography, Box, Button, TextField, CircularProgress, Backdrop, Container } from "@mui/material";
import { useState } from "react";
import { useCreateConnectedAccountMutation } from "../../services/api.ts";

const TeacherPaymentsPage = () => {
    const [connectedAccount, setConnectedAccount] = useState(null);
    const [formValues, setFormValues] = useState({
        accountName: "",
        accountNumber: "",
    });
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const [createConnectedAccount] = useCreateConnectedAccountMutation();

    const handleCreateAccountClick = async () => {
        setIsLoading(true); // Show loader
        try {
            const result = await createConnectedAccount(
                {}
            ).unwrap();
            window.location.href = result.data.url;
        } catch (error) {
            console.error("Error creating account:", error);
        } finally {
            setIsLoading(false); // Hide loader
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <>
            {/* <Paper sx={{ width: "100%", padding: "1rem", marginTop: "2rem" }}> */}
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: '#fff',
                        padding: 2,
                        borderRadius: 2,
                        marginBottom: "1rem",
                    }}
                >
                    <Typography variant="h5">Teacher Payments</Typography>
                    {!connectedAccount && (
                        <Button variant="contained" onClick={handleCreateAccountClick}
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#d8b74e',
                                    boxShadow: 'none',
                                },
                                '&:focus': {
                                    backgroundColor: '#d8b74e',
                                },
                                boxShadow: 'none', backgroundColor: '#161e2f', borderRadius: 40,
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Payment Account"}
                        </Button>
                    )}
                </Box>

                {connectedAccount && (
                    <Box>
                        <Typography variant="h6">Connected Account</Typography>
                        <Typography>
                            <strong>Account Name:</strong> {connectedAccount.accountName}
                        </Typography>
                        <Typography>
                            <strong>Account Number:</strong> {connectedAccount.accountNumber}
                        </Typography>
                    </Box>
                )}
            </Container>
            {/* </Paper> */}

            {/* Backdrop to display while loading */}
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="primary" />
                Please Wait
            </Backdrop>
        </>
    );
};

export default TeacherPaymentsPage;
