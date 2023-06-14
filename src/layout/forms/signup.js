import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
const MyComponent2 = styled('div')({
  color: 'darkslategray',
  backgroundColor: '#EFE7E7',
  marginTop: '15px',
  marginRight: '550px',
  marginLeft: '550px',
  padding: '8px',
  textAlign: 'center',
  borderRadius: '0.75rem',
  border: 'px solid',
  boxShadow: '5',
  display: 'block',
});

const theme = createTheme();

export default function FormUI({ onSubmit, formValues, handleInputChange, locationOptions }) {
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
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                variant="standard"
                value={formValues.name}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="standard"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                value={formValues.password}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                type="text"
                autoFocus
                variant="standard"
                value={formValues.role}
                onChange={handleInputChange}
              />
              <TextField
  margin="normal"
  required
  fullWidth
  id="location"
  label="Location"
  name="Location"
  select
  variant="standard"
  value={formValues.Location} 
  onChange={handleInputChange}
  SelectProps={{
    SelectDisplayProps: {
      style: { textAlign: 'start' },
    },
  }}
>
  {locationOptions.map((option) => (
    <MenuItem key={option.id} value={option.id}>
      {option.location}
    </MenuItem>
  ))}
</TextField>

              {/* ...remaining form fields */}
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign UP
              </Button>
              <Box sx={{ alignItems: 'center' }}>
                <Link href="/signin" variant="body2">
                  {"Do you have an account? Sign In"}
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </MyComponent2>
  );
}
