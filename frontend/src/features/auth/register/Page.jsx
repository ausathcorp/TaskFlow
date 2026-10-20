import React, { useState } from 'react';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Link } from 'react-router-dom';
import { Controller } from "react-hook-form";
import useRegisterForm from "./useRegisterForm";
import UsernameField from "../shared/components/UsernameField";
import PasswordField from "../shared/components/PasswordField";
import EmailField from "../shared/components/EmailField";
import ContactField from "../shared/components/ContactField";
import PasswordHelper from "../shared/components/PasswordHelper";

export default function Register() {
  const [isFocused, setIsFocused] = useState(false);
  const {
    control,
    isLoading,
    handleSubmit,
    onSubmit,
    register,
    password,
    errors,
  } = useRegisterForm();
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          fontWeight: 500,
          fontFamily: "roboto, sans-serif",
          mb: 2,
        }}
      >
        Create your Account
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Divider variant="fullWidth">
              <Chip variant="outlined" label="Personal Details" />
            </Divider>
            <TextField
              autoComplete="given-name"
              label="First Name"
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              autoComplete="family-name"
              label="Last Name"
              {...register("lastName", { required: "Last name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  select
                  label="Select Gender"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
              )}
            />

            <ContactField
              label="Contact"
              type="tel"
              autoComplete="tel"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[+]?\d{9,15}$/,
                  message: "Invalid content format",
                },
              })}
              error={!!errors.contact}
              helperText={errors.contact?.message}
            />
            <EmailField
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+[@][^\s@]+[.][^\s@]+[A-Za-z0-9]$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2}>
            <Divider variant="fullWidth">
              <Chip variant="outlined" label="Login Details" />
            </Divider>
            <UsernameField
              label="Username"
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <PasswordHelper {...{password, isFocused}} />
            <PasswordField
              label="Password"
              onFocus={(e) => setIsFocused(true)}
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <PasswordField
              label="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not matches",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Controller
              name="isAgreed"
              rules={{ required: "You must agree to our terms" }}
              control={control}
              render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error}>
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label={
                      <Typography variant="subtitle2">
                        By signing up you agree to our{" "}
                        <MuiLink>Terms of Service</MuiLink> and{" "}
                        <MuiLink>Privacy Policy</MuiLink>
                      </Typography>
                    }
                  />
                  <FormHelperText>{fieldState.error?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Button
              loading={isLoading}
              loadingPosition="end"
              variant="contained"
              fullWidth
              type="submit"
              color="primary"
              endIcon={<ArrowForward />}
            >
              Sign Up
            </Button>

            <Typography
              variant="subtitle2"
              sx={{ textAlign: "center", mt: 2, lineHeight: 2 }}
            >
              Already have an account? <br />
              <MuiLink component={Link} to="/login">
                Sign In
              </MuiLink>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
