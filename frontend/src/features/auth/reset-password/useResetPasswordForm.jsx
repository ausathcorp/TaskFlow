import React, { useEffect } from 'react';
import { useResetPasswordMutation } from "../shared/services/api";
import { useForm } from "react-hook-form";
import { useSnackbar } from "@/features/snackbar";
import { useSearchParams } from 'react-router-dom';

const defaultValues = {
  password: '',
  confirmPassword: ''
};

export default function useResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  useEffect(() => {
    console.log({ token })
  }, [token]);
  
  const showSnackbar = useSnackbar();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      let { success, message } = await resetPassword({token, data}).unwrap();
      if (success) {
        showSnackbar({
          message,
          severity: "success",
          variant: "filled",
        });
      }
    } catch (err) {
      if (!err.status || typeof err.status !== "number") {
        return showSnackbar({
          message: "Network error, please again",
          severity: "error",
          variant: "filled",
        });
      }
      return showSnackbar({
        message: err.data?.message,
        severity: "error",
        variant: "filled",
      });
    }
  };

  return {
    isLoading,
    handleSubmit,
    errors,
    register,
    password,
    onSubmit,
  };
}
