import { useRegisterMutation } from '../api'
import { setAuthenticatedUser } from '../authSlice'

import { useForm } from 'react-hook-form'

import { useSnackbar } from '@/features/snackbar'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const defaultValues = {
    firstName: '',
    lastName: '',
    gender: '',
    contact: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isAgreed: false
};

export default function useRegisterForm(){
    const dispath = useDispatch();
    const navigate = useNavigate();
    const showSnackbar = useSnackbar();
    const [registerUser, { isLoading }] = useRegisterMutation();
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors } } = useForm({defaultValues});
    
    const password = watch('password');
    
    const onSubmit = async (data) => {
        try{
            const response = await registerUser(data).unwrap();
            if(response.success){
                showSnackbar({
                    message: response.message, 
                    severity: 'success', 
                    variant: 'filled'});
            }
        } catch (err) {
            if(!err.status || typeof err.status === 'string')
                return showSnackbar({
                    message: 'Internet Error! Try again', 
                    severity: 'error',
                    variant: 'filled'});
                    
            return showSnackbar({
                message: err.data?.message, 
                severity: 'error',
                variant: 'filled'})
        }
    }
    
    return {
        control,
        isLoading,
        handleSubmit,
        onSubmit,
        register,
        password,
        errors
    }
}