import { LockOutlinedIcon } from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Copyright } from "@mui/icons-material";

const Auth = () => {
  const {
    user,
    email,
    password,
    emailError,
    passwordError,
    setUser,
    setEmail,
    setPassword,
    setEmailError,
    setPasswordError,
    handleRegister,
    handleLogOut,
    handleLogin,
    hasAccount,
    setHasAccount,
  } = useAuth();
  const handlesubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Box>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography components="h1" variant="h5">
          {hasAccount ? "Login Form" : "Register Now"}
        </Typography>
        <Box onSubmit={handlesubmit} component="from" sx={{ mt: 1 }}>
          <TextField
            label="email"
            autoFocus
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            helperText={emailError}
            fullWidth
            id="email"
            margin="normal"
          />
          <TextField
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={passwordError}
            fullWidth
            id="password"
            margin="normal"
            type="password"
            autoComplete="current-password"
          />
          {hasAccount ? (
            <Button
              type="submint"
              fullWidth
              variant="container"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          ) : (
            <Button
              type="submint"
              fullWidth
              variant="container"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
          )}
          <Grid container>
            <Grid item>
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setHasAccount(!hasAccount)}
              >
                {hasAccount
                  ? `Dont have an account? Register now`
                  : "Already an account? Login"}
              </Typography>
            </Grid>
            <Copyright sx={{ mt: 0, mb: 4 }} />
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
