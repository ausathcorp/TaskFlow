import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { useNavigate, Link as RouterLink } from 'react-router-dom'
import useForgotPasswordForm from './useForgotPasswordForm'
import EmailField from '../shared/components/EmailField'

export default function ForgotPasswordPage(){
    const {
        isLoading,
        handleSubmit,
        errors,
        register,
        email,
        onSubmit
    } = useForgotPasswordForm();
    return(
        <Paper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 3
            }}>
           <Typography 
                variant="h6"
                sx={{
                    textAlign: 'center',
                    fontWeight: 500,
                    fontFamily: 'roboto, sans-serif',
                    mb: 2
                }}>
                Forgot Password
            </Typography>
            
            <Stack spacing={2}>
                
                <EmailField 
                    label="Email"
                    {...register('email', {
                        required: "Email is required", 
                        pattern: {
                            value: /^[^\s@]+[@][^\s@]+[.][^\s@]+[A-Za-z0-9]$/, 
                            message: 'Invalid email format'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                
                <Stack 
                    direction="row"
                    sx={{justifyContent: 'flex-end'}}>
                    <Button
                        loading={isLoading}
                        loadingPosition="end"
                        variant="contained"
                        type="submit"
                        color="primary">
                        Send request
                    </Button>
                </Stack>
                
                <Typography
                    variant="body2"
                    sx={{textAlign: 'center'}}>
                    Password updated? <br />
                    <Link
                        component={RouterLink}
                        to='/login'>
                        Returns to login
                    </Link>
                </Typography>
                
            </Stack>
            
        </Paper>
    )
}