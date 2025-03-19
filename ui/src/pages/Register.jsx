import React from "react";
import { useNavigate } from "react-router-dom";
import customTheme from "../theme/theme";
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
  Divider,
  Link,
} from "@mui/joy";
import GoogleIcon from "../utils/GoogleIcon";
import { useDispatch } from "react-redux";
import { registerUser } from "../stores/middlewares/authMiddleware";
import { errorToast, successToast } from "../utils/toast";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const formData = {
      email: formElements.email.value,
      password: formElements.password.value,
      lastname: formElements.lastname.value,
      firstname: formElements.firstname.value,
    };

    try {
      await dispatch(registerUser({ ...formData })).unwrap();
      successToast("Register success");
      navigate("/login");
    } catch (err) {
      errorToast(err.message || "Register failed");
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
          <Card variant="outlined">
            <Typography level="h3" component="h1" textAlign="center">
              Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <FormControl required>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" name="lastname" />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6}>
                  <FormControl required>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" name="firstname" />
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" name="email" />
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      slotProps={{
                        input: {
                          pattern: ".{6,}",
                          title: "Mật khẩu phải chứa ít nhất 6 kí tự",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Button fullWidth type="submit" variant="solid" sx={{ my: 3 }}>
                Register
              </Button>
              <Divider>
                <Typography fontWeight="lg">Or continue with</Typography>
              </Divider>
              <Button
                variant="outlined"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign in with Google
              </Button>
              <Box display="flex" justifyContent="center">
                <Link fontSize="sm" href="/login" fontWeight="lg">
                  Login here!
                </Link>
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}

export default Register;
