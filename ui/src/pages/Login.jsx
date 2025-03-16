import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  Box,
  Typography,
  Card,
  Container,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Checkbox,
  Divider,
  IconButton,
} from "@mui/joy";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import customTheme from "../theme/theme";
import GoogleIcon from "./GoogleIcon";
import { loginUser } from "../stores/middlewares/authMiddleware";
import { errorToast, successToast } from "../utils/toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formElements = event.currentTarget.elements;
      const formData = {
        email: formElements.email.value.trim(),
        password: formElements.password.value,
        rememberMe: formElements.rememberMe.checked,
      };

      // Basic form validation
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all required fields");
      }

      // Dispatch login action and handle response
      const result = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      // On successful login, navigate to dashboard or home
      if (result) {
        navigate("/"); // Adjust this route as needed
        successToast("Log in successfully");
      }
    } catch (err) {
      errorToast(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <CssVarsProvider theme={customTheme}>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card variant="outlined" sx={{ width: "100%" }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Log in to your account
              </Typography>
              <Typography level="body2" sx={{ my: 1 }}>
                Welcome to ChatApps!
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      disabled={isLoading}
                      autoComplete="current-password"
                      endDecorator={
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  my: 2,
                }}
              >
                <Checkbox
                  size="sm"
                  label="Remember for 30 days"
                  name="rememberMe"
                  disabled={isLoading}
                />
                <Link
                  fontSize="sm"
                  href="/forgot-password"
                  fontWeight="lg"
                  disabled={isLoading}
                >
                  Forgot your password?
                </Link>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="solid"
                loading={isLoading}
                sx={{ mb: 3 }}
              >
                Log in
              </Button>

              <Divider sx={{ my: 2 }}>
                <Typography level="body2" fontWeight="lg">
                  Or continue with
                </Typography>
              </Divider>

              <Button
                variant="outlined"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
                disabled={isLoading}
                sx={{ mt: 2, mb: 2 }}
              >
                Sign in with Google
              </Button>

              <Box display="flex" justifyContent="center">
                <Link
                  fontSize="sm"
                  href="/register"
                  fontWeight="lg"
                  disabled={isLoading}
                >
                  Don&apos;t have an account? Register now!
                </Link>
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}

export default Login;
