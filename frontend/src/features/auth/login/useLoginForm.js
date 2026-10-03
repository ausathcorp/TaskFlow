import { useLoginMutation } from '../shared/services/api'
import { setAuthenticatedUser } from '../shared/services/authSlice'

import { useForm } from 'react-hook-form'

import { useSnackbar } from '@/features/snackbar'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const defaultValues = {
    email: '',
    password: '',
    rememberMe: false
};

export default function useLoginForm(){
    const dispath = useDispatch();
    const showSnackbar = useSnackbar();
    const [loginUser, { isLoading }] = useLoginMutation();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors } } = useForm({ defaultValues });
    
    const onSubmit = async (data) => {
        try{
            const response = await loginUser(data).unwrap();
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
        isLoading,
        control,
        handleSubmit,
        onSubmit,
        register,
        errors
    }
}