import React, { useState } from 'react';
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link } from 'react-router-dom'
import useResetPasswordForm from "./useResetPasswordForm";
import PasswordField from "../shared/components/PasswordField";
import PasswordHelper from "../shared/components/PasswordHelper";

export default function ResetPasswordPage() {
  const [isFocused, setIsFocused] = useState(false);
  const { 
    isLoading, 
    handleSubmit, 
    errors, 
    register, 
    password, 
    onSubmit } = useResetPasswordForm();
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
        Reset Password
      </Typography>

      <Stack spacing={2}>

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
          {...register("confirm_password", {
            required: "Confirm password is required",
            validate: (value) =>
              (value === password) || "Passwords do not matches",
          })}
          error={!!errors.confirm_password}
          helperText={errors.confirm_password?.message}
        />

        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
            type="submit"
            color="primary"
          >
            Reset Password
          </Button>
        </Stack>

        <Typography variant="body2" sx={{ textAlign: "center", lineHeight: 2 }}>
          Session Expired? <br />
          <MuiLink component={Link} to="/forgot-password">
            Send new request.
          </MuiLink>
        </Typography>
      </Stack>
    </Paper>
  );
}
