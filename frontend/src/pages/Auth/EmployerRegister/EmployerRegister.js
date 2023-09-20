import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EmployerRegister() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\-]).{8,}$/;
    return re.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!companyName || !email || !password || !confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setMessage("Password must meet the requirements listed below.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/employer/register",
        {
          companyName,
          email,
          password,
        }
      );
      setMessage("Employer registered");
      navigate("/employerlogin");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Unable to register. Please try again later.");
      }
    }
  };

  return (
    <Box
      sx={{
        flex: "1 1 auto",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          px: 3,
          py: "100px",
          width: "100%",
        }}
      >
        <div>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Employer Register</Typography>
            <Typography color="text.secondary" variant="body2">
              Already have an account? &nbsp;
              <Link
                href="/employer-login"
                underline="hover"
                variant="subtitle2"
              >
                Log in
              </Link>
            </Typography>
          </Stack>
          <form noValidate onSubmit={handleRegister}>
            <Stack spacing={3}>
              <TextField
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <TextField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                Password must:
                <ul>
                  <li>Be at least 8 characters long</li>
                  <li>Include both uppercase and lowercase characters</li>
                  <li>Contain at least one number</li>
                  <li>Have at least one special character (e.g., !@#$%^&*-)</li>
                </ul>
              </Typography>
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </form>
          {message && (
            <Typography sx={{ mt: 2 }} color="text.secondary" variant="body2">
              {message}
            </Typography>
          )}
        </div>
      </Box>
    </Box>
  );
}

export default EmployerRegister;
