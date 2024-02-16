import React, { useState } from "react";
import {
  Alert,
  Button,
  ButtonBase,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="centr"
        alignItems="centr"
        flexDirection="column"
        marginTop="150px"
        marginLeft="500px"
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Typography
          sx={{
            fontFamily: "Montserrat,sans-serif",
            letterSpacing: "2px",
            fontSize: "32px",
          }}
        >
          Sign In
        </Typography>
        <TextField
          sx={{ marginTop: "30px", width: "40%" }}
          label="email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ marginTop: "30px", width: "40%" }}
          label="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          sx={{ marginTop: "30px", width: "40%" }}
          variant="contained"
          onClick={handleLoginSubmit}
        >
          Sign In
        </Button>
        <div style={{ marginTop: "15px", marginLeft: "160px" }}>
          Don't have an account?{" "}
          <Link to="/auth" style={{ marginLeft: "10px", color: "blue" }}>
            Sign Up
          </Link>
        </div>
      </Grid>
    </>
  );
};

export default Login;
