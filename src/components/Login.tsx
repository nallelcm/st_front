import { Typography, Box, TextField, Button, Alert, Link } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProviderContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
const Login: React.FC = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  } as { username: string; password: string });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!token) {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = credentials;
    if (!username || !password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }
    setErrorMessage("");
    try {
      await login(username, password);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "An error occurred.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  return (
    <>
      {" "}
      {token ? (
        <></>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            mt: 4,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 4,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            Login
          </Typography>

          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={credentials.username}
            onChange={handleChange}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={credentials.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          {errorMessage && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register" color="primary">
              Register here
            </Link>
          </Typography>
        </Box>
      )}
    </>
  );
  //return (

  // <Box component="form" onSubmit={handleSubmit}>
  //   <Typography variant="h4">Login</Typography>

  //   <TextField
  //     name="username"
  //     label="Username"
  //     variant="outlined"
  //     fullWidth
  //     margin="normal"
  //     value={credentials.username}
  //     onChange={handleChange}
  //   />
  //   <TextField
  //     name="password"
  //     label="Password"
  //     type="password"
  //     variant="outlined"
  //     fullWidth
  //     margin="normal"
  //     value={credentials.password}
  //     onChange={handleChange}
  //   />
  //   <Button type="submit" fullWidth variant="contained" color="primary">
  //     Login
  //   </Button>
  //   {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
  // </Box>
};

export default Login;
