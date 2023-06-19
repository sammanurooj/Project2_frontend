import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

const MyComponent2 = styled('div')({
    color: 'darkslategray',
    backgroundColor: '#EFE7E7',
    marginTop: '150px',
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: '16px',
    textAlign: 'center',
    borderRadius: '0.75rem',
    border: '1px solid',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
});

const theme = createTheme();

export default function FormUI({ onSubmit, formValues, handleInputChange }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formValues);
    };


    return (
        <MyComponent2>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Add Location
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="location"
                                label="Location"
                                name="location"
                                autoComplete="name"
                                autoFocus
                                variant="standard"
                                value={formValues.location}
                                onChange={handleInputChange}
                            />

                            

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </MyComponent2>
    );
}
