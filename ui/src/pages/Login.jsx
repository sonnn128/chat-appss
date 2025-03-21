import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Link,
  Typography,
} from "@mui/joy";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { loginUser } from "@/stores/middlewares/authMiddleware";
import customTheme from "@/theme/theme";
import GoogleIcon from "@/utils/GoogleIcon";
import { errorToast, successToast } from "@/utils/toast";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { email, password, rememberMe } = e.currentTarget.elements;
      if (!email.value.trim() || !password.value)
        throw new Error("Please fill in all required fields");
      const result = await dispatch(
        loginUser({ email: email.value.trim(), password: password.value })
      ).unwrap();
      if (result) {
        navigate("/");
        successToast("Log in successfully");
      }
    } catch (err) {
      errorToast(err.message || "Login failed. Please try again.");
      setIsLoading(false);
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
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <Typography fontSize="xl2" fontWeight="lg">
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
                sx={{ display: "flex", justifyContent: "space-between", my: 2 }}
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
                sx={{ my: 2 }}
              >
                Sign in with Google
              </Button>
              <Box sx={{ textAlign: "center" }}>
                <Link
                  fontSize="sm"
                  href="/register"
                  fontWeight="lg"
                  disabled={isLoading}
                >
                  Don't have an account? Register now!
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
